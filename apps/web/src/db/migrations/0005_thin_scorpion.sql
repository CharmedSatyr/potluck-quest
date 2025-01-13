CREATE TABLE "discord_event_mapping" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"discord_event_id" varchar(25) NOT NULL,
	"discord_guild_id" varchar(25) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"potluck_event_code" varchar(5) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "discord_event_mapping_discord_event_id_unique" UNIQUE("discord_event_id"),
	CONSTRAINT "discord_event_mapping_potluck_event_code_unique" UNIQUE("potluck_event_code")
);
--> statement-breakpoint
ALTER TABLE "discord_event_mapping" ADD CONSTRAINT "discord_event_mapping_potluck_event_code_event_code_fk" FOREIGN KEY ("potluck_event_code") REFERENCES "public"."event"("code") ON DELETE cascade ON UPDATE no action;