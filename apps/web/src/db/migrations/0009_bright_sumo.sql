ALTER TABLE "anonymous_rsvp" RENAME TO "anonymous_rsvps";--> statement-breakpoint
ALTER TABLE "anonymous_rsvps" RENAME COLUMN "interestedCount" TO "discord_interested_count";--> statement-breakpoint
ALTER TABLE "anonymous_rsvps" DROP CONSTRAINT "anonymous_rsvp_event_id_event_id_fk";
--> statement-breakpoint
ALTER TABLE "anonymous_rsvps" ADD CONSTRAINT "anonymous_rsvps_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;