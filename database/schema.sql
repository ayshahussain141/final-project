set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

 CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."courseEntries" (
	"courseId" serial NOT NULL,
	"courseName" TEXT NOT NULL,
	"colorCode" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	CONSTRAINT "courseEntries_pk" PRIMARY KEY ("courseId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."assignments" (
	"assignmentId" serial NOT NULL,
	"assignment" TEXT NOT NULL,
	"about" TEXT NOT NULL,
	"dateDue" DATE NOT NULL,
	"courseId" integer NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	CONSTRAINT "assignments_pk" PRIMARY KEY ("assignmentId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "courseEntries" ADD CONSTRAINT "courseEntries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "assignments" ADD CONSTRAINT "assignments_fk0" FOREIGN KEY ("courseId") REFERENCES "courseEntries"("courseId");
