import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740329299547 implements MigrationInterface {
    name = 'Migrations1740329299547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_ExamInfo" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" BIGSERIAL NOT NULL,
                "ExamTitle" character varying NOT NULL,
                "ExamTypeId" integer NOT NULL,
                "ExamHoldId" integer,
                "Duration" integer,
                "FromDate" TIMESTAMP,
                "ToDate" TIMESTAMP,
                CONSTRAINT "UQ_b150036c42f23ed6121d31bf1de" UNIQUE ("Id"),
                CONSTRAINT "PK_b150036c42f23ed6121d31bf1de" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_QuestionAttachment" (
                "Id" BIGSERIAL NOT NULL,
                "QuestionId" bigint NOT NULL,
                "FileName" character varying(500) NOT NULL,
                "AttachmentId" uuid NOT NULL,
                CONSTRAINT "UQ_4c92c1a1c761b423a4e97f0333a" UNIQUE ("Id"),
                CONSTRAINT "PK_4c92c1a1c761b423a4e97f0333a" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_ExamQuestion" (
                "Id" BIGSERIAL NOT NULL,
                "QuestionTitle" character varying NOT NULL,
                "Order" integer,
                "IsDescriptive" boolean,
                "AnswerDescription" text,
                "DifficultyLevel" text,
                "ExamId" bigint NOT NULL,
                CONSTRAINT "UQ_94095f1f11cbb9104f5223e1ea8" UNIQUE ("Id"),
                CONSTRAINT "PK_94095f1f11cbb9104f5223e1ea8" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_OptionAttachment" (
                "Id" BIGSERIAL NOT NULL,
                "OptionId" bigint NOT NULL,
                "FileName" character varying(500) NOT NULL,
                "AttachmentId" uuid NOT NULL,
                CONSTRAINT "UQ_e6b20c2def3c1321121e7a10743" UNIQUE ("Id"),
                CONSTRAINT "PK_e6b20c2def3c1321121e7a10743" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_QuestionOption" (
                "Id" BIGSERIAL NOT NULL,
                "QuestionId" bigint NOT NULL,
                "OptionDesc" character varying NOT NULL,
                "Order" integer,
                "IsCorrect" boolean,
                CONSTRAINT "UQ_1cfee998a5708e83c906f9350a5" UNIQUE ("Id"),
                CONSTRAINT "PK_1cfee998a5708e83c906f9350a5" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_Personnel" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" BIGSERIAL NOT NULL,
                "NationalNo" character varying NOT NULL,
                "PersonnelNo" character varying NOT NULL,
                "FirstName" character varying NOT NULL,
                "LastName" character varying NOT NULL,
                "FatherName" character varying NOT NULL,
                "IdNo" character varying(30),
                "BirthPlaceId" integer,
                "IssuePlaceId" integer,
                "LocationId" integer,
                "BirthDate" date NOT NULL,
                "IssueDate" date,
                "Address" character varying(1000) NOT NULL,
                "TelephoneNumber" character varying,
                "MobileNumber" character varying,
                "PostalCode" character varying(10),
                "NationalityId" integer,
                "MotherTongueId" integer,
                "ReligionId" integer,
                "AccentId" integer,
                "Height" double precision,
                "Weight" integer,
                "ClothingSizeId" integer,
                "HatSizeId" integer,
                "ShoeSizeId" integer,
                "BloodGroupId" integer,
                "EyeColorId" integer,
                "BrotherCount" integer,
                "SisterCount" integer,
                "ImageId" character varying,
                CONSTRAINT "UQ_f13d02fc2c910cb3f24fec2a78b" UNIQUE ("Id"),
                CONSTRAINT "PK_f13d02fc2c910cb3f24fec2a78b" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_ExamPerson" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" BIGSERIAL NOT NULL,
                "PersonalId" bigint,
                "VolunteerInfoId" bigint,
                "ExamId" bigint,
                "Score" integer,
                "StartTime" TIMESTAMP,
                "EndTime" TIMESTAMP,
                "IsPresent" boolean,
                CONSTRAINT "UQ_999ed9bc9efc9a82da14ebe448a" UNIQUE ("Id"),
                CONSTRAINT "PK_999ed9bc9efc9a82da14ebe448a" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_AnswerSubmission" (
                "Id" BIGSERIAL NOT NULL,
                "AnswerSubmissionTime" TIMESTAMP NOT NULL,
                "QuestionId" bigint NOT NULL,
                "VolunteerInfoId" bigint NOT NULL,
                "OptionId" bigint NOT NULL,
                "AnswerDescription" character varying(1000) NOT NULL,
                CONSTRAINT "UQ_ca200175e1f2792a5e7c57b1498" UNIQUE ("Id"),
                CONSTRAINT "PK_ca200175e1f2792a5e7c57b1498" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo"
            ADD CONSTRAINT "FK_18b94e5f6bcdadd7864ff45809d" FOREIGN KEY ("ExamTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo"
            ADD CONSTRAINT "FK_e995ce7e819b4e342187d67b036" FOREIGN KEY ("ExamHoldId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_QuestionAttachment"
            ADD CONSTRAINT "FK_345405683879757676319c58b22" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_ExamQuestion"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamQuestion"
            ADD CONSTRAINT "FK_6cb5b8ebf5bc085f33632488bdf" FOREIGN KEY ("ExamId") REFERENCES "exam"."tb_ExamInfo"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_OptionAttachment"
            ADD CONSTRAINT "FK_99bd1b86f3abeb82837c2226282" FOREIGN KEY ("OptionId") REFERENCES "exam"."tb_QuestionOption"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_QuestionOption"
            ADD CONSTRAINT "FK_c669a2bce5734fdfb08673169e8" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_ExamQuestion"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_9fddc584be8955119b199de8a19" FOREIGN KEY ("BirthPlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_3319c835cfd57e741f8712ca076" FOREIGN KEY ("IssuePlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_4d7343fb2741369c15e52406736" FOREIGN KEY ("LocationId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_56e6286547730f4619c3f7a4260" FOREIGN KEY ("NationalityId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_251bc5af57e5b6f9eb2df21282a" FOREIGN KEY ("MotherTongueId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_5daa1954c33cccba501ee99a69f" FOREIGN KEY ("ReligionId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_a523bcce8b0078d96c75f5c0a8d" FOREIGN KEY ("AccentId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_c4dd3f47c314dde3be83ec4705d" FOREIGN KEY ("ClothingSizeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_eb27a4ba5c7dc2dd9f5a074ee3e" FOREIGN KEY ("HatSizeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_4886cca6e19155560dd295e9076" FOREIGN KEY ("ShoeSizeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_c9659b14b13f50c00be04e45951" FOREIGN KEY ("BloodGroupId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_28180ebe088e8b124e4a2f31ddd" FOREIGN KEY ("EyeColorId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson"
            ADD CONSTRAINT "FK_a168f17189edd0762e620eb5717" FOREIGN KEY ("PersonalId") REFERENCES "exam"."tb_Personnel"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson"
            ADD CONSTRAINT "FK_d528668df74a40d8972c0aa3e76" FOREIGN KEY ("VolunteerInfoId") REFERENCES "recruitment"."tb_VolunteerInfo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson"
            ADD CONSTRAINT "FK_8ec37184e3b9acc427dfc397f10" FOREIGN KEY ("ExamId") REFERENCES "exam"."tb_ExamInfo"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD CONSTRAINT "FK_79326249a1ab65488f8541bf23d" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_ExamQuestion"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD CONSTRAINT "FK_fb4fe0ad1f6ce3df651a2a1eedb" FOREIGN KEY ("VolunteerInfoId") REFERENCES "recruitment"."tb_VolunteerInfo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD CONSTRAINT "FK_9b93246d5db89b2ad24b22d5d2a" FOREIGN KEY ("OptionId") REFERENCES "exam"."tb_QuestionOption"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "FK_9b93246d5db89b2ad24b22d5d2a"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "FK_fb4fe0ad1f6ce3df651a2a1eedb"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "FK_79326249a1ab65488f8541bf23d"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson" DROP CONSTRAINT "FK_8ec37184e3b9acc427dfc397f10"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson" DROP CONSTRAINT "FK_d528668df74a40d8972c0aa3e76"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson" DROP CONSTRAINT "FK_a168f17189edd0762e620eb5717"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_28180ebe088e8b124e4a2f31ddd"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_c9659b14b13f50c00be04e45951"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_4886cca6e19155560dd295e9076"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_eb27a4ba5c7dc2dd9f5a074ee3e"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_c4dd3f47c314dde3be83ec4705d"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_a523bcce8b0078d96c75f5c0a8d"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_5daa1954c33cccba501ee99a69f"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_251bc5af57e5b6f9eb2df21282a"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_56e6286547730f4619c3f7a4260"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_4d7343fb2741369c15e52406736"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_3319c835cfd57e741f8712ca076"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_9fddc584be8955119b199de8a19"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_QuestionOption" DROP CONSTRAINT "FK_c669a2bce5734fdfb08673169e8"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_OptionAttachment" DROP CONSTRAINT "FK_99bd1b86f3abeb82837c2226282"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "FK_6cb5b8ebf5bc085f33632488bdf"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_QuestionAttachment" DROP CONSTRAINT "FK_345405683879757676319c58b22"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo" DROP CONSTRAINT "FK_e995ce7e819b4e342187d67b036"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo" DROP CONSTRAINT "FK_18b94e5f6bcdadd7864ff45809d"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_AnswerSubmission"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_ExamPerson"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_Personnel"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_QuestionOption"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_OptionAttachment"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_ExamQuestion"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_QuestionAttachment"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_ExamInfo"
        `);
    }

}
