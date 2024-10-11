import { MigrationInterface, QueryRunner } from "typeorm";

export class ModificateDocument1728609349581 implements MigrationInterface {
    name = 'ModificateDocument1728609349581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_68fc8b14e52b90f21467ba8b1b8"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "profile_id"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document" ADD "profile_id" uuid`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_68fc8b14e52b90f21467ba8b1b8" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
