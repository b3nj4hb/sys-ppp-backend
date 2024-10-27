import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCompanyContact1730073107548 implements MigrationInterface {
    name = 'UpdateCompanyContact1730073107548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_contact" DROP COLUMN "name_representative"`);
        await queryRunner.query(`ALTER TABLE "company_contact" ADD "dni" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_contact" ADD "names" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_contact" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_contact" ADD "second_lastname" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_contact" DROP COLUMN "second_lastname"`);
        await queryRunner.query(`ALTER TABLE "company_contact" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "company_contact" DROP COLUMN "names"`);
        await queryRunner.query(`ALTER TABLE "company_contact" DROP COLUMN "dni"`);
        await queryRunner.query(`ALTER TABLE "company_contact" ADD "name_representative" character varying NOT NULL`);
    }

}
