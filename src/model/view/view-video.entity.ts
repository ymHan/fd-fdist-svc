import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
    select
        "ve"."id" as "videoId",
        "ve"."userId",
        "uae"."email",
        "ve"."title",
        "ve"."sub_title" as "subTitle",
        "ve"."description",
        "uae"."name" as "ownerName",
        "uae"."nickname" as "ownerNickName",
        cae."channelName" as "ownerChannelName",
        concat("ve"."url", "upae"."photo") as "ownerProfileIconUrl",
        make_urls("ve"."id", 'thumb') as thumbnailUrl,
        "ve"."view_count" as "viewCount",
        "ve"."reportCount",
        "ve"."like_count" as "likesCount",
        "ve"."duration",
        get_categorysub_name("ve"."category") as "category",
        get_categorysub_name("ve"."categorySub") as "categorySub",
        "ve"."categorySubCode",
        "ve"."recordType",
        make_urls("ve"."id", 'file') as "contentUrlList",
        make_urls("ve"."id", 'pose') as "poseIndicatorList",
        "channelList",
        "ve"."nodeId",
        "ve"."createdAt",
        "ve"."updatedAt"
    from "video_entity" "ve"
             left join "user_account_entity" "uae" on "ve"."userId" = "uae"."id"
             left join "user_profile_account_entity" "upae" on "uae"."profileId" = "upae"."id"
             left join "channel_account_entity" "cae" on "cae"."id" = "uae"."channelId"
    where
        "ve"."isStatus" = true
  `
})
export class ViewVideo {
  @ViewColumn()
  videoId: number;

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
  nodeId: string;

  @ViewColumn()
  createdAt: Date;

  @ViewColumn()
  updatedAt: Date;
}
