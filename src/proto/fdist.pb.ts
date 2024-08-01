/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.pb";

export const protobufPackage = "fdist";

export interface GetAllVideoResponse {
  result: string;
  status: number;
  message: string;
  data: GetAllVideoResponse_DATA[];
  nextCursor: string;
}

export interface GetAllVideoResponse_DATA {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  isPublished: string;
  channelList: string[];
}

export interface GetAllVideoRequest {
  cursor: string;
  limit: number;
}

export interface VideoMakeRequest {
  videoId: number;
  userId: number;
  tempId: string;
  recordType: string;
}

export interface VideoMakeResponse {
  videoId: number;
  userId: number;
  tempId: string;
  recordType: string;
}

export interface VideoUploadRequest {
  tempId: string;
  category: string;
  recordType: string;
  contents: string[];
  duration: string;
  thumbnail: string[];
}

export interface VideoUploadResponse {
  videoId: number;
  userId: number;
  tempId: string;
  recordType: string;
}

export interface addTmpVideoRequest {
  tempId: string;
  ownerEmail: string;
  nodeId: string;
}

export interface addTmpVideoResponse {
  id: number;
  tempId: string;
}

export interface TogglePublishedRequest {
  userId: string;
  videoId: number;
  isPublished: boolean;
}

export interface TogglePublishedResponse {
  result: string;
  status: number;
  message: string;
  data: TogglePublishedResponse_DATA | undefined;
}

export interface TogglePublishedResponse_DATA {
  isPublished: boolean;
}

export interface DeleteVideoRequest {
  videoId: number;
}

export interface DeleteVideoResponse {
  result: string;
  status: number;
  message: string;
}

export interface IvpVideoResponse {
  result: string;
  status: number;
  message: string;
}

export interface MyVideoExistsRequest {
  userEmail: string;
}

export interface MyVideoExistsResponse {
  result: string;
  status: number;
  message: string;
}

export interface MyVideoListResponse {
  result: string;
  status: number;
  message: string;
  data: MyVideoListResponse_DATA[];
  meta: MyVideoListResponse_Meta | undefined;
}

export interface MyVideoListResponse_DATA {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  isPublished: string;
  channelList: string[];
}

export interface MyVideoListResponse_Meta {
  page: number;
  limit: number;
  totalCount: number;
  lastPage: number;
}

export interface MyVideoListRequest {
  userEmail: string;
  page: number;
  limit: number;
  sort: string;
  order: string;
}

export interface GetLikeCheckResponse {
  result: string;
  status: number;
  message: string;
  data: GetLikeCheckResponse_DATA[];
}

export interface GetLikeCheckResponse_DATA {
  result: boolean;
}

export interface GetLikeCheckRequest {
  userId: number;
  videoId: number;
}

export interface GetVideoRecordTypeRequest {
  type: string;
  page: number;
  limit: number;
}

export interface GetVideoRecordTypeResponse {
  result: string;
  status: number;
  message: string;
  data: GetVideoRecordTypeResponse_DATA[];
  meta: GetVideoRecordTypeResponse_Meta | undefined;
}

export interface GetVideoRecordTypeResponse_DATA {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  channelList: string[];
}

export interface GetVideoRecordTypeResponse_Meta {
  total: number;
  page: number;
  lastPage: number;
}

export interface GetRecordTypeResponse {
  result: string;
  status: number;
  message: string;
  data: GetRecordTypeResponse_DATA[];
}

export interface GetRecordTypeResponse_DATA {
  index: number;
  recordType: string;
}

export interface GetVideoCategoryRequest {
  caty: string;
}

export interface GetVideoCategoryResponse {
  result: string;
  status: number;
  message: string;
  data: GetVideoCategoryResponse_DATA[];
}

export interface GetVideoCategoryResponse_DATA {
  index: number;
  category: string;
}

export interface GetReportTypeResponse {
  result: string;
  status: number;
  message: string;
  data: GetReportTypeResponse_DATA[];
}

export interface GetReportTypeResponse_DATA {
  code: string;
  name: string;
  isDeleted: boolean;
}

export interface ReportVideoRequest {
  userId: number;
  videoId: number;
  reportType: number;
  report: string;
}

export interface ReportVideoResponse {
  result: string;
  status: number;
  message: string;
  data: ReportVideoResponse_DATA[];
}

export interface ReportVideoResponse_DATA {
  result?: boolean | undefined;
  error?: string | undefined;
}

export interface ToggleLikeRequest {
  userId: number;
  videoId: number;
  isLike: boolean;
}

export interface ToggleLikeResponse {
  result: string;
  status: number;
  message: string;
  data: ToggleLikeResponse_DATA[];
}

export interface ToggleLikeResponse_DATA {
  result?: boolean | undefined;
  likeCount?: number | undefined;
  error?: string | undefined;
}

export interface GetCateorySubRequest {
  lang: string;
}

export interface GetCategorySubResponse {
  result: string;
  status: number;
  message: string;
  data: GetCategorySubResponse_DATA[];
}

export interface GetCategorySubResponse_DATA {
  index: number;
  categorySubName: string;
}

export interface GetVideoListRequest {
  cat: string;
  page: number;
  limit: number;
}

export interface GetVideoByIdRequest {
  id: number;
}

export interface IdVideo {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  isPublished: string;
  channelList: string[];
}

export interface Videos {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  channelList: string[];
}

export interface GetVideoByIdResponse {
  result: string;
  status: number;
  message: string;
  data: IdVideo | undefined;
}

export interface Meta {
  total: number;
  page: number;
  lastPage: number;
}

export interface GetVideoListResponse {
  result: string;
  status: number;
  message: string;
  data: Videos[];
  meta: Meta | undefined;
}

export interface InitInfoResponse {
  nodeId: string;
}

export interface VideoRecordingRequest {
  nodeId: string;
  userId: string;
  command: string;
}

export interface VideoRecordingResponse {
  result: string;
}

export interface GetNodeIdRequest {
  userId: string;
}

export interface GetNodeIdResponse {
  nodeId: string;
}

export interface GetContentRequest {
  id: string;
}

export interface GetContentResponse {
  contentItem: ContentItem | undefined;
}

export interface Category {
  id: number;
  title: string;
  iconUrl: string;
}

export interface GetCategoryResponse {
  result: string;
  status: number;
  message: string;
  data: GetCategoryResponse_DATA[];
}

export interface GetCategoryResponse_DATA {
  index: number;
  category: string;
}

export interface ContentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconUrl: string;
  thumbnailUrl: string;
  displayedDuration: string;
  streamingUrl: string;
}

export interface AddHtmlRequest {
  fileName: string;
}

export interface AddHtmlResponse {
  result: string;
  status: number;
  message: string;
}

export interface ExistsVideoRequest {
  userEmail: string;
}

export interface ExistsVideoResponse {
  result: string;
  status: number;
  message: string;
}

export interface UpdateVideoMetaInfoRequest {
  userEmail: string;
  videoId: number;
  title: string;
  subTitle: string;
  description: string;
}

export interface UpdateVideoMetaInfoResponse {
  result: string;
  status: number;
  message: string;
  data: UpdateVideoMetaInfoResponse_DATA | undefined;
}

export interface UpdateVideoMetaInfoResponse_DATA {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  channelList: string[];
}

export interface ExistsMwcResponse {
  result: string;
  status: number;
  message: string;
  data: ExistsMwcResponse_DATA | undefined;
}

export interface ExistsMwcResponse_DATA {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  channelList: string[];
}

export interface ExistsMwcRequest {
  userEmail: string;
  fileName: string;
}

export interface AddMwcRequest {
  userId: string;
  fileName: string;
}

export interface AddMwcResponse {
  result: string;
  status: number;
  message: string;
  data: AddMwcResponse_DATA | undefined;
}

export interface AddMwcResponse_DATA {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  channelList: string[];
}

export interface VideoTagListByVideoIdRequest {
  videoId: number;
}

export interface VideoTagListByVideoIdResponse {
  result: string;
  status: number;
  message: string;
  data: VideoTagListByVideoIdResponse_DATA[];
}

export interface VideoTagListByVideoIdResponse_DATA {
  id: number;
  videoId: number;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoTagCreateRequest {
  videoId: number;
  tag: string;
}

export interface VideoTagCreateResponse {
  result: string;
  status: number;
  message: string;
  data: VideoTagCreateResponse_DATA | undefined;
}

export interface VideoTagCreateResponse_DATA {
  id: number;
  videoId: number;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoTagDeleteRequest {
  id: number;
}

export interface VideoTagDeleteResponse {
  result: string;
  status: number;
  message: string;
}

export interface VideoTagUpdateRequest {
  id: number;
  tag: string;
}

export interface VideoTagUpdateResponse {
  result: string;
  status: number;
  message: string;
  data: VideoTagUpdateResponse_DATA | undefined;
}

export interface VideoTagUpdateResponse_DATA {
  id: number;
  videoId: number;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export const FDIST_PACKAGE_NAME = "fdist";

export interface VideoServiceClient {
  togglePublished(request: TogglePublishedRequest): Observable<TogglePublishedResponse>;

  deleteVideo(request: DeleteVideoRequest): Observable<DeleteVideoResponse>;

  shootingVideo(request: addTmpVideoRequest): Observable<addTmpVideoResponse>;

  videoDone(request: VideoUploadRequest): Observable<VideoUploadResponse>;

  videoMake(request: VideoMakeRequest): Observable<VideoMakeResponse>;

  ivpVideo(request: GetVideoByIdRequest): Observable<IvpVideoResponse>;

  ivpVideoP(request: GetVideoByIdRequest): Observable<IvpVideoResponse>;

  findAllVideo(request: GetAllVideoRequest): Observable<GetAllVideoResponse>;
}

export interface VideoServiceController {
  togglePublished(
    request: TogglePublishedRequest,
  ): Promise<TogglePublishedResponse> | Observable<TogglePublishedResponse> | TogglePublishedResponse;

  deleteVideo(
    request: DeleteVideoRequest,
  ): Promise<DeleteVideoResponse> | Observable<DeleteVideoResponse> | DeleteVideoResponse;

  shootingVideo(
    request: addTmpVideoRequest,
  ): Promise<addTmpVideoResponse> | Observable<addTmpVideoResponse> | addTmpVideoResponse;

  videoDone(
    request: VideoUploadRequest,
  ): Promise<VideoUploadResponse> | Observable<VideoUploadResponse> | VideoUploadResponse;

  videoMake(request: VideoMakeRequest): Promise<VideoMakeResponse> | Observable<VideoMakeResponse> | VideoMakeResponse;

  ivpVideo(request: GetVideoByIdRequest): Promise<IvpVideoResponse> | Observable<IvpVideoResponse> | IvpVideoResponse;

  ivpVideoP(request: GetVideoByIdRequest): Promise<IvpVideoResponse> | Observable<IvpVideoResponse> | IvpVideoResponse;

  findAllVideo(
    request: GetAllVideoRequest,
  ): Promise<GetAllVideoResponse> | Observable<GetAllVideoResponse> | GetAllVideoResponse;
}

export function VideoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "togglePublished",
      "deleteVideo",
      "shootingVideo",
      "videoDone",
      "videoMake",
      "ivpVideo",
      "ivpVideoP",
      "findAllVideo",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("VideoService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("VideoService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const VIDEO_SERVICE_NAME = "VideoService";

export interface FDistServiceClient {
  getContent(request: GetContentRequest): Observable<GetContentResponse>;

  videoRecording(request: VideoRecordingRequest): Observable<VideoRecordingResponse>;

  getNodeId(request: GetNodeIdRequest): Observable<GetNodeIdResponse>;

  initialize(request: Empty): Observable<InitInfoResponse>;

  getVideos(request: GetVideoListRequest): Observable<GetVideoListResponse>;

  getVideoById(request: GetVideoByIdRequest): Observable<GetVideoByIdResponse>;

  getVideoCategory(request: GetVideoCategoryRequest): Observable<GetVideoCategoryResponse>;

  getVideoRecordType(request: GetVideoRecordTypeRequest): Observable<GetVideoRecordTypeResponse>;

  getCategory(request: Empty): Observable<GetCategoryResponse>;

  getCategorySub(request: GetCateorySubRequest): Observable<GetCategorySubResponse>;

  getRecordType(request: Empty): Observable<GetRecordTypeResponse>;

  toggleLike(request: ToggleLikeRequest): Observable<ToggleLikeResponse>;

  getLikeCheck(request: GetLikeCheckRequest): Observable<GetLikeCheckResponse>;

  getReportVideoType(request: Empty): Observable<GetReportTypeResponse>;

  reportVideo(request: ReportVideoRequest): Observable<ReportVideoResponse>;

  myVideoList(request: MyVideoListRequest): Observable<MyVideoListResponse>;

  myVideoExists(request: MyVideoExistsRequest): Observable<MyVideoExistsResponse>;
}

export interface FDistServiceController {
  getContent(
    request: GetContentRequest,
  ): Promise<GetContentResponse> | Observable<GetContentResponse> | GetContentResponse;

  videoRecording(
    request: VideoRecordingRequest,
  ): Promise<VideoRecordingResponse> | Observable<VideoRecordingResponse> | VideoRecordingResponse;

  getNodeId(request: GetNodeIdRequest): Promise<GetNodeIdResponse> | Observable<GetNodeIdResponse> | GetNodeIdResponse;

  initialize(request: Empty): Promise<InitInfoResponse> | Observable<InitInfoResponse> | InitInfoResponse;

  getVideos(
    request: GetVideoListRequest,
  ): Promise<GetVideoListResponse> | Observable<GetVideoListResponse> | GetVideoListResponse;

  getVideoById(
    request: GetVideoByIdRequest,
  ): Promise<GetVideoByIdResponse> | Observable<GetVideoByIdResponse> | GetVideoByIdResponse;

  getVideoCategory(
    request: GetVideoCategoryRequest,
  ): Promise<GetVideoCategoryResponse> | Observable<GetVideoCategoryResponse> | GetVideoCategoryResponse;

  getVideoRecordType(
    request: GetVideoRecordTypeRequest,
  ): Promise<GetVideoRecordTypeResponse> | Observable<GetVideoRecordTypeResponse> | GetVideoRecordTypeResponse;

  getCategory(request: Empty): Promise<GetCategoryResponse> | Observable<GetCategoryResponse> | GetCategoryResponse;

  getCategorySub(
    request: GetCateorySubRequest,
  ): Promise<GetCategorySubResponse> | Observable<GetCategorySubResponse> | GetCategorySubResponse;

  getRecordType(
    request: Empty,
  ): Promise<GetRecordTypeResponse> | Observable<GetRecordTypeResponse> | GetRecordTypeResponse;

  toggleLike(
    request: ToggleLikeRequest,
  ): Promise<ToggleLikeResponse> | Observable<ToggleLikeResponse> | ToggleLikeResponse;

  getLikeCheck(
    request: GetLikeCheckRequest,
  ): Promise<GetLikeCheckResponse> | Observable<GetLikeCheckResponse> | GetLikeCheckResponse;

  getReportVideoType(
    request: Empty,
  ): Promise<GetReportTypeResponse> | Observable<GetReportTypeResponse> | GetReportTypeResponse;

  reportVideo(
    request: ReportVideoRequest,
  ): Promise<ReportVideoResponse> | Observable<ReportVideoResponse> | ReportVideoResponse;

  myVideoList(
    request: MyVideoListRequest,
  ): Promise<MyVideoListResponse> | Observable<MyVideoListResponse> | MyVideoListResponse;

  myVideoExists(
    request: MyVideoExistsRequest,
  ): Promise<MyVideoExistsResponse> | Observable<MyVideoExistsResponse> | MyVideoExistsResponse;
}

export function FDistServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getContent",
      "videoRecording",
      "getNodeId",
      "initialize",
      "getVideos",
      "getVideoById",
      "getVideoCategory",
      "getVideoRecordType",
      "getCategory",
      "getCategorySub",
      "getRecordType",
      "toggleLike",
      "getLikeCheck",
      "getReportVideoType",
      "reportVideo",
      "myVideoList",
      "myVideoExists",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FDistService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FDistService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const F_DIST_SERVICE_NAME = "FDistService";

export interface MwcServiceClient {
  addMwc(request: AddMwcRequest): Observable<AddMwcResponse>;

  existsMwc(request: ExistsMwcRequest): Observable<ExistsMwcResponse>;

  updateVideoMetaInfo(request: UpdateVideoMetaInfoRequest): Observable<UpdateVideoMetaInfoResponse>;

  existsVideo(request: ExistsVideoRequest): Observable<ExistsVideoResponse>;

  addHtml(request: AddHtmlRequest): Observable<AddHtmlResponse>;
}

export interface MwcServiceController {
  addMwc(request: AddMwcRequest): Promise<AddMwcResponse> | Observable<AddMwcResponse> | AddMwcResponse;

  existsMwc(request: ExistsMwcRequest): Promise<ExistsMwcResponse> | Observable<ExistsMwcResponse> | ExistsMwcResponse;

  updateVideoMetaInfo(
    request: UpdateVideoMetaInfoRequest,
  ): Promise<UpdateVideoMetaInfoResponse> | Observable<UpdateVideoMetaInfoResponse> | UpdateVideoMetaInfoResponse;

  existsVideo(
    request: ExistsVideoRequest,
  ): Promise<ExistsVideoResponse> | Observable<ExistsVideoResponse> | ExistsVideoResponse;

  addHtml(request: AddHtmlRequest): Promise<AddHtmlResponse> | Observable<AddHtmlResponse> | AddHtmlResponse;
}

export function MwcServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["addMwc", "existsMwc", "updateVideoMetaInfo", "existsVideo", "addHtml"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MwcService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MwcService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MWC_SERVICE_NAME = "MwcService";

export interface TagServiceClient {
  videoTagCreate(request: VideoTagCreateRequest): Observable<VideoTagCreateResponse>;

  videoTagDelete(request: VideoTagDeleteRequest): Observable<VideoTagDeleteResponse>;

  videoTagUpdate(request: VideoTagUpdateRequest): Observable<VideoTagUpdateResponse>;

  videoTagListByVideoId(request: VideoTagListByVideoIdRequest): Observable<VideoTagListByVideoIdResponse>;
}

export interface TagServiceController {
  videoTagCreate(
    request: VideoTagCreateRequest,
  ): Promise<VideoTagCreateResponse> | Observable<VideoTagCreateResponse> | VideoTagCreateResponse;

  videoTagDelete(
    request: VideoTagDeleteRequest,
  ): Promise<VideoTagDeleteResponse> | Observable<VideoTagDeleteResponse> | VideoTagDeleteResponse;

  videoTagUpdate(
    request: VideoTagUpdateRequest,
  ): Promise<VideoTagUpdateResponse> | Observable<VideoTagUpdateResponse> | VideoTagUpdateResponse;

  videoTagListByVideoId(
    request: VideoTagListByVideoIdRequest,
  ): Promise<VideoTagListByVideoIdResponse> | Observable<VideoTagListByVideoIdResponse> | VideoTagListByVideoIdResponse;
}

export function TagServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["videoTagCreate", "videoTagDelete", "videoTagUpdate", "videoTagListByVideoId"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TagService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TagService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TAG_SERVICE_NAME = "TagService";
