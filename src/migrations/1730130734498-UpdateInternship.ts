import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInternship1730130734498 implements MigrationInterface {
    name = 'UpdateInternship1730130734498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "internship" ALTER COLUMN "hours" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "internship" ALTER COLUMN "hours" SET NOT NULL`);
    }

}
