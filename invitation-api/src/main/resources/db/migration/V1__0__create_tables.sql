CREATE SEQUENCE user_id_seq;

CREATE TABLE "user"
(
    "id" integer NOT NULL DEFAULT nextval('user_id_seq'),
    "fiancee" character varying(255) NOT NULL,
    "fiance" character varying(255) NOT NULL,
    "wedding_day" TIMESTAMP NOT NULL,
    "data_register" TIMESTAMP NOT NULL,
    "email" character varying(100) NOT NULL UNIQUE,
    "password" character varying(100) NOT NULL,
    CONSTRAINT PK_user PRIMARY KEY ("id")
);

insert into "user" (fiancee, fiance, wedding_day, data_register, email, password) VALUES ('Admin', 'Admin', now(), now(), 'admin@gmail.com', 'admin');

CREATE SEQUENCE guest_id_seq;

CREATE TABLE "guest"
(
    "id" integer NOT NULL DEFAULT nextval('guest_id_seq'),
    "guest" character varying(255) NOT NULL,
    "qrcode" character varying(255),
    "host" character varying(100) NOT NULL,
    "confirmation" boolean NOT NULL,
    "confirmation_date" TIMESTAMP,
    "id_user" integer NOT NULL,
    CONSTRAINT FK_guest_user FOREIGN KEY ("id_user") REFERENCES "user"("id"),
    CONSTRAINT PK_guest PRIMARY KEY ("id")
);


