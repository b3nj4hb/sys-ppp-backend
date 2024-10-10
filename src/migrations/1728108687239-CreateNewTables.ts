import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewTables1728108687239 implements MigrationInterface {
    name = 'CreateNewTables1728108687239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name_representative" character varying NOT NULL, "academic_degree" character varying NOT NULL, "position_representative" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "company_id" uuid, CONSTRAINT "PK_83805404ba83a62bac85a4a479f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_name" character varying NOT NULL, "direction" character varying NOT NULL, "district" character varying NOT NULL, "province" character varying NOT NULL, "ruc" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."profile_role_enum" AS ENUM('student', 'admin', 'secretary')`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "first_name" character varying NOT NULL, "middle_name" character varying NOT NULL, "last_name" character varying NOT NULL, "second_last_name" character varying NOT NULL, "code" character varying NOT NULL, "phone" character varying, "avatar_url" character varying, "role" "public"."profile_role_enum" NOT NULL DEFAULT 'student', CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_2e1aa55eac1947ddf3221506edb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "file_url" character varying NOT NULL, "profile_id" uuid, "document_type_id" uuid, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."internship_document_approval_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "internship_document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "approval_status" "public"."internship_document_approval_status_enum" NOT NULL DEFAULT 'pending', "internship_id" uuid, "document_id" uuid, CONSTRAINT "PK_0b2aadd7f968ac3926da1523840" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."internship_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "internship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "position" character varying NOT NULL, "description" character varying NOT NULL, "hours" integer NOT NULL, "status" "public"."internship_status_enum" NOT NULL DEFAULT 'pending', "student_id" uuid, "company_id" uuid, CONSTRAINT "PK_dd14a64bcc5e8b5843a2764915a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "academic_cycle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_44e33ac97beb430d1b83bfe7e94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "student_status" boolean NOT NULL, "profile_id" uuid, "academic_cycle_id" uuid, CONSTRAINT "REL_48e055651592504b63f3910d20" UNIQUE ("profile_id"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evaluation_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_a906ff2d5c394980616575a9301" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evaluation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "evaluation_date" date NOT NULL, "evaluation_hour" TIME NOT NULL, "general_score" integer, "evaluation_type_id" uuid, "evaluation_structure_id" uuid, "internship_id" uuid, "evaluator_id" uuid, CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evaluation_structure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_55aeffbc59435c0964818795dbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dimension_structure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "order" integer NOT NULL, "evaluation_structure_id" uuid, CONSTRAINT "PK_e97684926fe620082796d43decf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dimension_evaluation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "dimensionScore" integer, "evaluation_id" uuid, "dimension_structure_id" uuid, CONSTRAINT "PK_6a0173b5236873b9a3ff6e879cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_evaluation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "score" integer, "dimension_evaluation_id" uuid, "question_structure_id" uuid, CONSTRAINT "PK_1d2e76e4279b7fe17b785cd695f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_structure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "order" integer NOT NULL, "dimensionStructureId" uuid, CONSTRAINT "PK_bc54f08e0da29e2e33d291d634f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company_contact" ADD CONSTRAINT "FK_9031bd290f244bacb589001e8a4" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_68fc8b14e52b90f21467ba8b1b8" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_6b439665ef703bf850df3f12134" FOREIGN KEY ("document_type_id") REFERENCES "document_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "internship_document" ADD CONSTRAINT "FK_e50b8cf598c19291969566062de" FOREIGN KEY ("internship_id") REFERENCES "internship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "internship_document" ADD CONSTRAINT "FK_9f785ad31cc9d681a37543edf1d" FOREIGN KEY ("document_id") REFERENCES "document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "internship" ADD CONSTRAINT "FK_49051cedc9ffbdf57b8d2d2d6b8" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "internship" ADD CONSTRAINT "FK_0650e3aa9764dfe7dced2dcf2ce" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_48e055651592504b63f3910d204" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_997b58a9ea9fcc8d623ad23ff19" FOREIGN KEY ("academic_cycle_id") REFERENCES "academic_cycle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "FK_63e5cd9f7caf0e5aec03e27144c" FOREIGN KEY ("evaluation_type_id") REFERENCES "evaluation_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "FK_b91622bf08096edbd321f43694e" FOREIGN KEY ("evaluation_structure_id") REFERENCES "evaluation_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "FK_8e9eaa9fd3dcec3709a45cb2650" FOREIGN KEY ("internship_id") REFERENCES "internship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "FK_2374848eb53de22ea29b8093a0c" FOREIGN KEY ("evaluator_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dimension_structure" ADD CONSTRAINT "FK_bf93529bcc5e9663c119b405451" FOREIGN KEY ("evaluation_structure_id") REFERENCES "evaluation_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dimension_evaluation" ADD CONSTRAINT "FK_ebcf945a47af6f7d5507599b90a" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dimension_evaluation" ADD CONSTRAINT "FK_6b2de868629dc9d35076023d764" FOREIGN KEY ("dimension_structure_id") REFERENCES "dimension_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_evaluation" ADD CONSTRAINT "FK_13033d19affa1dd773effe4e4c2" FOREIGN KEY ("dimension_evaluation_id") REFERENCES "dimension_evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_evaluation" ADD CONSTRAINT "FK_f5e7b5f8b364055a2271de6d373" FOREIGN KEY ("question_structure_id") REFERENCES "question_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_structure" ADD CONSTRAINT "FK_92776bd7449f8b029acc78f77bb" FOREIGN KEY ("dimensionStructureId") REFERENCES "dimension_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_structure" DROP CONSTRAINT "FK_92776bd7449f8b029acc78f77bb"`);
        await queryRunner.query(`ALTER TABLE "question_evaluation" DROP CONSTRAINT "FK_f5e7b5f8b364055a2271de6d373"`);
        await queryRunner.query(`ALTER TABLE "question_evaluation" DROP CONSTRAINT "FK_13033d19affa1dd773effe4e4c2"`);
        await queryRunner.query(`ALTER TABLE "dimension_evaluation" DROP CONSTRAINT "FK_6b2de868629dc9d35076023d764"`);
        await queryRunner.query(`ALTER TABLE "dimension_evaluation" DROP CONSTRAINT "FK_ebcf945a47af6f7d5507599b90a"`);
        await queryRunner.query(`ALTER TABLE "dimension_structure" DROP CONSTRAINT "FK_bf93529bcc5e9663c119b405451"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "FK_2374848eb53de22ea29b8093a0c"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "FK_8e9eaa9fd3dcec3709a45cb2650"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "FK_b91622bf08096edbd321f43694e"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "FK_63e5cd9f7caf0e5aec03e27144c"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_997b58a9ea9fcc8d623ad23ff19"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_48e055651592504b63f3910d204"`);
        await queryRunner.query(`ALTER TABLE "internship" DROP CONSTRAINT "FK_0650e3aa9764dfe7dced2dcf2ce"`);
        await queryRunner.query(`ALTER TABLE "internship" DROP CONSTRAINT "FK_49051cedc9ffbdf57b8d2d2d6b8"`);
        await queryRunner.query(`ALTER TABLE "internship_document" DROP CONSTRAINT "FK_9f785ad31cc9d681a37543edf1d"`);
        await queryRunner.query(`ALTER TABLE "internship_document" DROP CONSTRAINT "FK_e50b8cf598c19291969566062de"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_6b439665ef703bf850df3f12134"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_68fc8b14e52b90f21467ba8b1b8"`);
        await queryRunner.query(`ALTER TABLE "company_contact" DROP CONSTRAINT "FK_9031bd290f244bacb589001e8a4"`);
        await queryRunner.query(`DROP TABLE "question_structure"`);
        await queryRunner.query(`DROP TABLE "question_evaluation"`);
        await queryRunner.query(`DROP TABLE "dimension_evaluation"`);
        await queryRunner.query(`DROP TABLE "dimension_structure"`);
        await queryRunner.query(`DROP TABLE "evaluation_structure"`);
        await queryRunner.query(`DROP TABLE "evaluation"`);
        await queryRunner.query(`DROP TABLE "evaluation_type"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "academic_cycle"`);
        await queryRunner.query(`DROP TABLE "internship"`);
        await queryRunner.query(`DROP TYPE "public"."internship_status_enum"`);
        await queryRunner.query(`DROP TABLE "internship_document"`);
        await queryRunner.query(`DROP TYPE "public"."internship_document_approval_status_enum"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TABLE "document_type"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TYPE "public"."profile_role_enum"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "company_contact"`);
    }

}
