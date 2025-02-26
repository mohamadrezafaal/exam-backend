import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738487866678 implements MigrationInterface {
    name = 'Migrations1738487866678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "base"."tb_BaseTable" (
                "Id" SERIAL NOT NULL,
                "SystemId" integer,
                "TableName" character varying(50) NOT NULL,
                "ParentTableId" integer,
                "IsEditable" boolean NOT NULL,
                CONSTRAINT "PK_49147bb7db26ab9b4f4eed1f279" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "base"."tb_SystemBaseItem" (
                "Id" SERIAL NOT NULL,
                "SystemId" integer NOT NULL,
                "BaseItemId" integer NOT NULL,
                CONSTRAINT "PK_aec3905e6de6a82350ef09de7c4" PRIMARY KEY ("Id", "SystemId", "BaseItemId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "base"."tb_SystemProcessDocument" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" SERIAL NOT NULL,
                "SystemProcessId" integer NOT NULL,
                "DocumentId" integer NOT NULL,
                CONSTRAINT "PK_c85866058252ce1889eb6dcf622" PRIMARY KEY ("Id", "SystemProcessId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_OrganAccessScopeWithDetail" (
                "Id" SERIAL NOT NULL,
                "OrganId" integer,
                "AccessOrganId" integer,
                CONSTRAINT "PK_11a25757ef9054b96dbcfcb71fc" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "base"."tb_GeographicalPlace" (
                "Id" SERIAL NOT NULL,
                "ParentId" integer,
                "Title" character varying(255),
                "TypeId" integer,
                "ItemCode" character varying(4),
                "BaseCode" character varying(15),
                "LeftId" integer,
                "RightId" integer,
                "LevelNumber" integer,
                "DeActiveDate" date,
                "nsleft" integer NOT NULL DEFAULT '1',
                "nsright" integer NOT NULL DEFAULT '2',
                CONSTRAINT "UQ_54d8f24dc9eff0d600cecd486f2" UNIQUE ("Id"),
                CONSTRAINT "PK_54d8f24dc9eff0d600cecd486f2" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualOrganProperty" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" SERIAL NOT NULL,
                "OrganId" integer NOT NULL,
                "ChangeDate" date NOT NULL,
                "GeographicalPlaceId" integer NOT NULL,
                "DeprivationDegreeId" integer,
                "BadWeatherDegreeId" integer,
                "AreaTypeId" integer NOT NULL,
                CONSTRAINT "PK_273080e689d8f404a14370c8f82" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualPost" (
                "Id" SERIAL NOT NULL,
                "Title" character varying NOT NULL,
                CONSTRAINT "PK_36a093afd2ae4daec237af5db9b" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualOrganPost" (
                "Id" SERIAL NOT NULL,
                "OrganId" integer NOT NULL,
                "PostId" integer NOT NULL,
                "Priority" smallint NOT NULL,
                "PostTypeId" integer,
                CONSTRAINT "PK_20622cfb1e40fb694362bbe3a9c" PRIMARY KEY ("Id", "PostId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualOrgan" (
                "Id" SERIAL NOT NULL,
                "ParentId" integer,
                "OrganTypeId" integer,
                "LeftId" integer,
                "RightId" integer,
                "nsright" integer,
                "nsleft" integer,
                "LevelNumber" integer,
                "SerialNumber" character(8),
                "ParagraphNumber" character(4),
                "Title" character varying(1000) NOT NULL,
                "ForceId" integer,
                "DeactivateDate" TIMESTAMP,
                "RowVersion" TIMESTAMP NOT NULL,
                "OrganCode" character varying(20),
                "OrganAddress" character varying(1000),
                "TelephoneNumber" character varying(50),
                CONSTRAINT "PK_cb982cb6e1a8c394f7b9426f006" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualOrganOperational" (
                "Id" SERIAL NOT NULL,
                "OrganId" integer NOT NULL,
                "OperationalId" integer,
                CONSTRAINT "PK_307af066eb008bee8cdb9f85a8b" PRIMARY KEY ("Id", "OrganId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "base"."tb_BaseItem" (
                "Id" SERIAL NOT NULL,
                "ItemCode" integer NOT NULL,
                "ItemName" character varying(200) NOT NULL,
                "ParentId" integer,
                "TableId" integer NOT NULL,
                "IsActive" boolean NOT NULL,
                CONSTRAINT "UQ_b09efe0751c8b4c28f25f6f5d42" UNIQUE ("Id"),
                CONSTRAINT "PK_b09efe0751c8b4c28f25f6f5d42" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "recruitment"."tb_VolunteerInfo" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" BIGSERIAL NOT NULL,
                "EmploymentSpectrumId" integer NOT NULL,
                "EmploymentTypeId" integer NOT NULL,
                "ForceId" integer NOT NULL,
                "NationalNo" character varying NOT NULL,
                "FirstName" character varying NOT NULL,
                "LastName" character varying NOT NULL,
                "NickName" character varying NOT NULL,
                "PreviousLastName" character varying NOT NULL,
                "GenderId" integer NOT NULL,
                "FatherName" character varying NOT NULL,
                "TelephoneNumber" character varying,
                "MobileNumber" character varying,
                "IdNo" character varying(30),
                "IdSerial" character varying(6),
                "IdSeri" character varying(1),
                "BirthPlaceId" integer,
                "BirthDate" date NOT NULL,
                "LocationId" integer,
                "Address" character varying(1000) NOT NULL,
                "PostalCode" character varying(10),
                "EducationLevelId" integer NOT NULL,
                "EducationFieldId" integer NOT NULL,
                "EducationGradeId" integer NOT NULL,
                "ApplyPlaceId" integer,
                "IssuePlaceId" integer,
                "IssueDate" date,
                "MarriageStatusId" integer,
                "WorkingStatusId" integer,
                "JobTitle" character varying(1000) NOT NULL,
                "PhysicalStatusId" integer,
                "ReligionId" integer,
                "NationalityId" integer,
                "LastDegreeMean" double precision,
                "Height" double precision,
                "Weight" integer,
                "ChildCount" integer,
                "EyeColorId" integer,
                "InstituteId" integer,
                "BloodGroupId" integer,
                "DutyStatusId" integer,
                "VolunteerCode" character varying NOT NULL,
                "Vaccination" character varying NOT NULL,
                "isInCommitteeEmdad" boolean,
                "IsInBehzisti" boolean,
                "IsElite" boolean,
                "IsChampion" boolean,
                "IsHafez" boolean,
                "BasijStatusId" integer,
                "BasijDuration" integer,
                CONSTRAINT "UQ_c929371ab6b4e347a627d0b30d7" UNIQUE ("Id"),
                CONSTRAINT "PK_c929371ab6b4e347a627d0b30d7" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseTable"
            ADD CONSTRAINT "FK_ecff53cc2570cac8adeb994f36c" FOREIGN KEY ("ParentTableId") REFERENCES "base"."tb_BaseTable"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_SystemBaseItem"
            ADD CONSTRAINT "FK_93043116eb43d47bdc23f7a6733" FOREIGN KEY ("BaseItemId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_SystemProcessDocument"
            ADD CONSTRAINT "FK_0d479bdc8a247942d5d67fec8e1" FOREIGN KEY ("DocumentId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_OrganAccessScopeWithDetail"
            ADD CONSTRAINT "FK_67988f5a62b9ae6371a62861253" FOREIGN KEY ("OrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_OrganAccessScopeWithDetail"
            ADD CONSTRAINT "FK_a7733407cc73ba00bfe8ee6c4f3" FOREIGN KEY ("AccessOrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_GeographicalPlace"
            ADD CONSTRAINT "FK_dfbf84b9735b03d76fd81d08253" FOREIGN KEY ("ParentId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_GeographicalPlace"
            ADD CONSTRAINT "FK_ccbaf959d58518fb97cdf67fb3c" FOREIGN KEY ("TypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_d5619b602efd417c3868a8c3e85" FOREIGN KEY ("OrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_0211db93cd2e7705a2291c68def" FOREIGN KEY ("GeographicalPlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_04398850295f36280377adab5e8" FOREIGN KEY ("DeprivationDegreeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_bfc155bf7e368511a60df4dd374" FOREIGN KEY ("BadWeatherDegreeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_c1dc6db60ae86f415a8e82ecb77" FOREIGN KEY ("AreaTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost"
            ADD CONSTRAINT "FK_6f378d09a01261410d751a70145" FOREIGN KEY ("OrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost"
            ADD CONSTRAINT "FK_f541cad8a3880101d75809a82a9" FOREIGN KEY ("PostId") REFERENCES "organ"."tb_VirtualPost"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost"
            ADD CONSTRAINT "FK_4120acba827dc366b669a38ab82" FOREIGN KEY ("PostTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan"
            ADD CONSTRAINT "FK_10a7c5a61282766a433ad260f77" FOREIGN KEY ("ParentId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan"
            ADD CONSTRAINT "FK_3d86be392f56bb0c2b17d80b030" FOREIGN KEY ("OrganTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan"
            ADD CONSTRAINT "FK_b1201b750c21edfe665fd514583" FOREIGN KEY ("ForceId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganOperational"
            ADD CONSTRAINT "FK_8781f496d04bb4152686363ec9a" FOREIGN KEY ("OrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganOperational"
            ADD CONSTRAINT "FK_6eec1dfb55570810439dca83012" FOREIGN KEY ("OperationalId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseItem"
            ADD CONSTRAINT "FK_6572b5466bd8467c065f0420db7" FOREIGN KEY ("ParentId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseItem"
            ADD CONSTRAINT "FK_02c344a8a70a62e617e6f2d8b46" FOREIGN KEY ("TableId") REFERENCES "base"."tb_BaseTable"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_c2545fa14a8d0fd9d961e4a24c6" FOREIGN KEY ("EmploymentSpectrumId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_62cf33c2686eb7dcd4f8d6e5818" FOREIGN KEY ("EmploymentTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_6e326bd9031fae5925ffb450bc4" FOREIGN KEY ("ForceId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_815b1512ff2784431c15cfa6b29" FOREIGN KEY ("GenderId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_90feea1585b18263aaaea042c67" FOREIGN KEY ("BirthPlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_3b3df0ab149de62647a15dd7d33" FOREIGN KEY ("LocationId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_96ee1eedf17a8ffa36b245f145c" FOREIGN KEY ("EducationLevelId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_4c1458a3d9d05a4194edde79e2d" FOREIGN KEY ("EducationFieldId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_aea2b9996ddecdd511b9cf5553e" FOREIGN KEY ("EducationGradeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_be068dc60b74ea3001b9042dbef" FOREIGN KEY ("ApplyPlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_5714e377732f73a49defcd184fa" FOREIGN KEY ("IssuePlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_920aa8871bbbef146c6b33f68a3" FOREIGN KEY ("MarriageStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_f6ae94afc9c33047dab41ac5d07" FOREIGN KEY ("WorkingStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_9db97e0ad9ff230c145d84f7da8" FOREIGN KEY ("PhysicalStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_c505b85e74acb3fa87b38996f81" FOREIGN KEY ("ReligionId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_77b6620a53896c95dcacc99210d" FOREIGN KEY ("NationalityId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_b4c1a469698d8ca4f0e1cca23c3" FOREIGN KEY ("EyeColorId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_38fbf34c88163c36c24838ab1ee" FOREIGN KEY ("InstituteId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_e1f57967083d272c19cf60e60c7" FOREIGN KEY ("BloodGroupId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_5a4096a40d16db7f70b0731d607" FOREIGN KEY ("DutyStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_8cf4e4d81033d850e300e0ffebc" FOREIGN KEY ("BasijStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_8cf4e4d81033d850e300e0ffebc"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_5a4096a40d16db7f70b0731d607"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_e1f57967083d272c19cf60e60c7"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_38fbf34c88163c36c24838ab1ee"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_b4c1a469698d8ca4f0e1cca23c3"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_77b6620a53896c95dcacc99210d"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_c505b85e74acb3fa87b38996f81"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_9db97e0ad9ff230c145d84f7da8"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_f6ae94afc9c33047dab41ac5d07"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_920aa8871bbbef146c6b33f68a3"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_5714e377732f73a49defcd184fa"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_be068dc60b74ea3001b9042dbef"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_aea2b9996ddecdd511b9cf5553e"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_4c1458a3d9d05a4194edde79e2d"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_96ee1eedf17a8ffa36b245f145c"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_3b3df0ab149de62647a15dd7d33"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_90feea1585b18263aaaea042c67"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_815b1512ff2784431c15cfa6b29"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_6e326bd9031fae5925ffb450bc4"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_62cf33c2686eb7dcd4f8d6e5818"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_c2545fa14a8d0fd9d961e4a24c6"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseItem" DROP CONSTRAINT "FK_02c344a8a70a62e617e6f2d8b46"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseItem" DROP CONSTRAINT "FK_6572b5466bd8467c065f0420db7"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganOperational" DROP CONSTRAINT "FK_6eec1dfb55570810439dca83012"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganOperational" DROP CONSTRAINT "FK_8781f496d04bb4152686363ec9a"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan" DROP CONSTRAINT "FK_b1201b750c21edfe665fd514583"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan" DROP CONSTRAINT "FK_3d86be392f56bb0c2b17d80b030"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan" DROP CONSTRAINT "FK_10a7c5a61282766a433ad260f77"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost" DROP CONSTRAINT "FK_4120acba827dc366b669a38ab82"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost" DROP CONSTRAINT "FK_f541cad8a3880101d75809a82a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost" DROP CONSTRAINT "FK_6f378d09a01261410d751a70145"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_c1dc6db60ae86f415a8e82ecb77"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_bfc155bf7e368511a60df4dd374"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_04398850295f36280377adab5e8"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_0211db93cd2e7705a2291c68def"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_d5619b602efd417c3868a8c3e85"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_GeographicalPlace" DROP CONSTRAINT "FK_ccbaf959d58518fb97cdf67fb3c"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_GeographicalPlace" DROP CONSTRAINT "FK_dfbf84b9735b03d76fd81d08253"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_OrganAccessScopeWithDetail" DROP CONSTRAINT "FK_a7733407cc73ba00bfe8ee6c4f3"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_OrganAccessScopeWithDetail" DROP CONSTRAINT "FK_67988f5a62b9ae6371a62861253"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_SystemProcessDocument" DROP CONSTRAINT "FK_0d479bdc8a247942d5d67fec8e1"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_SystemBaseItem" DROP CONSTRAINT "FK_93043116eb43d47bdc23f7a6733"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseTable" DROP CONSTRAINT "FK_ecff53cc2570cac8adeb994f36c"
        `);
        await queryRunner.query(`
            DROP TABLE "recruitment"."tb_VolunteerInfo"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_BaseItem"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualOrganOperational"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualOrgan"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualOrganPost"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualPost"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualOrganProperty"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_GeographicalPlace"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_OrganAccessScopeWithDetail"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_SystemProcessDocument"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_SystemBaseItem"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_BaseTable"
        `);
    }

}
