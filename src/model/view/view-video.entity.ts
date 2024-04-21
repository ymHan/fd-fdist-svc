import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
      SELECT ve.id AS id,
             ve."userId" as userId,
             uae.email as email,
             ve.title as title,
             ve.sub_title AS subTitle,
             ve.description as description,
             uae.name AS ownerName,
             uae.nickname AS ownerNickName,
             cae."channelName" AS ownerChannelName,
             concat(ve.url, upae.photo) AS ownerProfileIconUrl,
             make_urls(ve.id, 'thumb'::bpchar) AS thumbnailUrl,
             ve.view_count AS viewCount,
             ve."reportCount" as reportCount,
             ve.like_count AS likesCount,
             ve.duration as duration,
             get_categorysub_name(ve.category) AS category,
             get_categorysub_name(ve."categorySub") AS "categorySub",
             ve."categorySubCode" as categorySubCode,
             ve."recordType" as recordType,
             make_urls(ve.id, 'file'::bpchar) AS "contentUrlList",
             make_urls(ve.id, 'pose'::bpchar) AS "poseIndicatorList",
             ve."channelList",
             ve."isPublic",
             ve."isDeleted",
             ve."nodeId",
             ve."createdAt",
             ve."updatedAt"
      FROM video_entity ve
               LEFT JOIN user_account_entity uae ON ve."userId" = uae.id
               LEFT OUTER JOIN user_profile_account_entity upae ON uae."profileId" = upae.id
               LEFT OUTER JOIN channel_account_entity cae ON cae.id = uae."channelId"
      WHERE ve."isStatus" = true
  `,
})
export class ViewVideo {
  @ViewColumn()
  id: number;

  @ViewColumn()
  userId: number;

  @ViewColumn()
  email: string;

  @ViewColumn()
  title: string;

  @ViewColumn()
  subTitle: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  ownerName: string;

  @ViewColumn()
  ownerNickName: string;

  @ViewColumn()
  ownerChannelName: string;

  @ViewColumn()
  ownerProfileIconUrl: string;

  @ViewColumn()
  thumbnailUrl: string;

  @ViewColumn()
  viewCount: number;

  @ViewColumn()
  reportCount: number;

  @ViewColumn()
  likesCount: number;

  @ViewColumn()
  duration: string;

  @ViewColumn()
  category: string;

  @ViewColumn()
  categorySub: string;

  @ViewColumn()
  categorySubCode: string;

  @ViewColumn()
  recordType: string;

  @ViewColumn()
  contentUrlList: string[];

  @ViewColumn()
  poseIndicatorList: string[];

  @ViewColumn()
  channelList: string[];

  @ViewColumn()
  isPublic: boolean;

  @ViewColumn()
  isDeleted: boolean;

  @ViewColumn()
  nodeId: string;

  @ViewColumn()
  createdAt: Date;

  @ViewColumn()
  updatedAt: Date;
}
