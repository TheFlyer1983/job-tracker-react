CREATE TYPE "job_status" AS ENUM('Saved', 'Applied', 'Interview', 'Offer', 'Rejected');--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"location" varchar(255),
	"salary" varchar(255),
	"status" "job_status" NOT NULL,
	"url" varchar(255),
	"notes" text
);
