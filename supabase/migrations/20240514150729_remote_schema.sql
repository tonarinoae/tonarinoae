
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."emit_watch_history"("_hentai_id" bigint) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    existing_record_count INT;
BEGIN
    SELECT COUNT(*)
    INTO existing_record_count
    FROM watch_history
    WHERE user_id =  auth.uid()
    AND hentai_id = _hentai_id
    AND DATE(watched_at) = CURRENT_DATE;
    
    -- Nếu đã có bản ghi trong ngày thì cập nhật watched_at
    IF existing_record_count > 0 THEN
        UPDATE watch_history
        SET watched_at = CURRENT_TIMESTAMP
        WHERE user_id =  auth.uid()
        AND hentai_id = _hentai_id
        AND DATE(watched_at) = CURRENT_DATE;
    ELSE
        -- Nếu chưa có bản ghi trong ngày thì thêm mới
        INSERT INTO watch_history (user_id, hentai_id, watched_at)
        VALUES ( auth.uid(), _hentai_id, CURRENT_TIMESTAMP);
    END IF;
END;
$$;

ALTER FUNCTION "public"."emit_watch_history"("_hentai_id" bigint) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."emit_watch_history"("_user_id" "uuid", "_hentai_id" bigint) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    existing_record_count INT;
BEGIN
    -- Kiểm tra xem ngày hiện tại đã có bản ghi watch_history cho user_id và hentai_id chưa
    SELECT COUNT(*)
    INTO existing_record_count
    FROM watch_history
    WHERE user_id = _user_id
    AND hentai_id = _hentai_id
    AND DATE(watched_at) = CURRENT_DATE;
    
    -- Nếu đã có bản ghi trong ngày thì cập nhật watched_at
    IF existing_record_count > 0 THEN
        UPDATE watch_history
        SET watched_at = CURRENT_TIMESTAMP
        WHERE user_id = _user_id
        AND hentai_id = _hentai_id
        AND DATE(watched_at) = CURRENT_DATE;
    ELSE
        -- Nếu chưa có bản ghi trong ngày thì thêm mới
        INSERT INTO watch_history (user_id, hentai_id, watched_at)
        VALUES (_user_id, _hentai_id, CURRENT_TIMESTAMP);
    END IF;
END;
$$;

ALTER FUNCTION "public"."emit_watch_history"("_user_id" "uuid", "_hentai_id" bigint) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."save_watch_progress"("_hentai_id" bigint, "_cur" integer, "_dur" integer) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    existing_record_count INT;
BEGIN
    IF _cur > _dur THEN
        RAISE EXCEPTION 'cur phải nhỏ hơn hoặc bằng dur';
    END IF;

    -- Kiểm tra xem đã có bản ghi trong bảng watch_progress cho user_id và hentai_id chưa
    SELECT COUNT(*)
    INTO existing_record_count
    FROM watch_progress
    WHERE user_id =  auth.uid()
    AND hentai_id = _hentai_id;
    
    -- Nếu đã có bản ghi, cập nhật
    IF existing_record_count > 0 THEN
        UPDATE watch_progress
        SET cur = _cur,
            dur = _dur,
            finished_at = CASE WHEN _cur = _dur THEN CURRENT_TIMESTAMP ELSE NULL END
        WHERE user_id =  auth.uid()
        AND hentai_id = _hentai_id;
    ELSE
        -- Nếu chưa có bản ghi, thêm mới
        INSERT INTO watch_progress (user_id, hentai_id, cur, dur, finished_at)
        VALUES ( auth.uid(), _hentai_id, _cur, _dur, CASE WHEN _cur = _dur THEN CURRENT_TIMESTAMP ELSE NULL END);
    END IF;
END;
$$;

ALTER FUNCTION "public"."save_watch_progress"("_hentai_id" bigint, "_cur" integer, "_dur" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."hentai_meta" (
    "id" bigint NOT NULL,
    "title" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "synopsis" "text" NOT NULL,
    "alternative_titles" "text"[] NOT NULL,
    "thumbnail" "text" NOT NULL,
    "poster" "text" NOT NULL,
    "notes" "text" NOT NULL,
    "censorship" "text" NOT NULL,
    "category" "text" NOT NULL,
    "raw_id" bigint NOT NULL
);

ALTER TABLE "public"."hentai_meta" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."hentai_meta_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."hentai_meta_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."hentai_meta_id_seq" OWNED BY "public"."hentai_meta"."id";

CREATE TABLE IF NOT EXISTS "public"."watch_history" (
    "id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "hentai_id" bigint NOT NULL,
    "watched_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."watch_history" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."watch_history_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."watch_history_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."watch_history_id_seq" OWNED BY "public"."watch_history"."id";

CREATE TABLE IF NOT EXISTS "public"."watch_progress" (
    "id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "hentai_id" bigint NOT NULL,
    "started_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "finished_at" timestamp without time zone,
    "cur" integer DEFAULT 0,
    "dur" integer
);

ALTER TABLE "public"."watch_progress" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."watch_progress_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."watch_progress_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."watch_progress_id_seq" OWNED BY "public"."watch_progress"."id";

ALTER TABLE ONLY "public"."watch_history" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."watch_history_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."watch_progress" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."watch_progress_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."hentai_meta"
    ADD CONSTRAINT "hentai_meta_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."hentai_meta"
    ADD CONSTRAINT "hentai_meta_raw_id_key" UNIQUE ("raw_id");

ALTER TABLE ONLY "public"."hentai_meta"
    ADD CONSTRAINT "hentai_meta_slug_key" UNIQUE ("slug");

ALTER TABLE ONLY "public"."watch_history"
    ADD CONSTRAINT "watch_history_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."watch_progress"
    ADD CONSTRAINT "watch_progress_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."watch_history"
    ADD CONSTRAINT "watch_history_hentai_id_fkey" FOREIGN KEY ("hentai_id") REFERENCES "public"."hentai_meta"("raw_id");

ALTER TABLE ONLY "public"."watch_history"
    ADD CONSTRAINT "watch_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."watch_progress"
    ADD CONSTRAINT "watch_progress_hentai_id_fkey" FOREIGN KEY ("hentai_id") REFERENCES "public"."hentai_meta"("raw_id");

ALTER TABLE ONLY "public"."watch_progress"
    ADD CONSTRAINT "watch_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."emit_watch_history"("_hentai_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."emit_watch_history"("_hentai_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."emit_watch_history"("_hentai_id" bigint) TO "service_role";

GRANT ALL ON FUNCTION "public"."emit_watch_history"("_user_id" "uuid", "_hentai_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."emit_watch_history"("_user_id" "uuid", "_hentai_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."emit_watch_history"("_user_id" "uuid", "_hentai_id" bigint) TO "service_role";

GRANT ALL ON FUNCTION "public"."save_watch_progress"("_hentai_id" bigint, "_cur" integer, "_dur" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."save_watch_progress"("_hentai_id" bigint, "_cur" integer, "_dur" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."save_watch_progress"("_hentai_id" bigint, "_cur" integer, "_dur" integer) TO "service_role";

GRANT ALL ON TABLE "public"."hentai_meta" TO "anon";
GRANT ALL ON TABLE "public"."hentai_meta" TO "authenticated";
GRANT ALL ON TABLE "public"."hentai_meta" TO "service_role";

GRANT ALL ON SEQUENCE "public"."hentai_meta_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."hentai_meta_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."hentai_meta_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."watch_history" TO "anon";
GRANT ALL ON TABLE "public"."watch_history" TO "authenticated";
GRANT ALL ON TABLE "public"."watch_history" TO "service_role";

GRANT ALL ON SEQUENCE "public"."watch_history_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."watch_history_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."watch_history_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."watch_progress" TO "anon";
GRANT ALL ON TABLE "public"."watch_progress" TO "authenticated";
GRANT ALL ON TABLE "public"."watch_progress" TO "service_role";

GRANT ALL ON SEQUENCE "public"."watch_progress_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."watch_progress_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."watch_progress_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
