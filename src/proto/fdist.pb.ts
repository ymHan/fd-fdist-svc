/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.pb";

export const protobufPackage = "fdist";

export interface GetVideoByIdRequest {
  id: number;
}

export interface GetVideoByIdResponse {
  video: Videos | undefined;
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
}

export interface GetVideoListResponse {
  result: string;
  status: number;
  message: string;
  data: Videos[];
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
  category: Category[];
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

export const FDIST_PACKAGE_NAME = "fdist";

export interface FDistServiceClient {
  getCategory(request: Empty): Observable<GetCategoryResponse>;

  getContent(request: GetContentRequest): Observable<GetContentResponse>;

  videoRecording(request: VideoRecordingRequest): Observable<VideoRecordingResponse>;

  getNodeId(request: GetNodeIdRequest): Observable<GetNodeIdResponse>;

  initialize(request: Empty): Observable<InitInfoResponse>;

  getVideos(request: Empty): Observable<GetVideoListResponse>;

  getVideoById(request: GetVideoByIdRequest): Observable<GetVideoByIdResponse>;
}

export interface FDistServiceController {
  getCategory(request: Empty): Promise<GetCategoryResponse> | Observable<GetCategoryResponse> | GetCategoryResponse;

  getContent(
    request: GetContentRequest,
  ): Promise<GetContentResponse> | Observable<GetContentResponse> | GetContentResponse;

  videoRecording(
    request: VideoRecordingRequest,
  ): Promise<VideoRecordingResponse> | Observable<VideoRecordingResponse> | VideoRecordingResponse;

  getNodeId(request: GetNodeIdRequest): Promise<GetNodeIdResponse> | Observable<GetNodeIdResponse> | GetNodeIdResponse;

  initialize(request: Empty): Promise<InitInfoResponse> | Observable<InitInfoResponse> | InitInfoResponse;

  getVideos(request: Empty): Promise<GetVideoListResponse> | Observable<GetVideoListResponse> | GetVideoListResponse;

  getVideoById(
    request: GetVideoByIdRequest,
  ): Promise<GetVideoByIdResponse> | Observable<GetVideoByIdResponse> | GetVideoByIdResponse;
}

export function FDistServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getCategory",
      "getContent",
      "videoRecording",
      "getNodeId",
      "initialize",
      "getVideos",
      "getVideoById",
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
