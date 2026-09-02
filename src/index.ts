import * as proto from "./generated/bundle";

export type ISignalRequestEnvelope = proto.saasy.signal.v1.ISignalRequestEnvelope;
export const SignalRequestEnvelope = proto.saasy.signal.v1.SignalRequestEnvelope;

export type ISignalResponseEnvelope = proto.saasy.signal.v1.ISignalResponseEnvelope;
export const SignalResponseEnvelope = proto.saasy.signal.v1.SignalResponseEnvelope;

export type ISessionEndReason = proto.saasy.sfu.v1.SessionEndReason;
export type ISfuEvent = proto.saasy.sfu.v1.ISfuEvent;
export const SessionEndReason = proto.saasy.sfu.v1.SessionEndReason;
export const SfuEvent = proto.saasy.sfu.v1.SfuEvent;

export type IIceCandidate = proto.saasy.shared.v1.IIceCandidate;
export type IIceParameters = proto.saasy.shared.v1.IIceParameters;
export type IDtlsParameters = proto.saasy.shared.v1.IDtlsParameters;
export type IDtlsFingerprint = proto.saasy.shared.v1.IDtlsFingerprint;
export type IRtcpFeedback = proto.saasy.shared.v1.IRtcpFeedback;
export type IRtpCodecParametersParameters = proto.saasy.shared.v1.IRtpCodecParametersParameters;
export type IAudioRtpCodecCapabilityFinalized = proto.saasy.shared.v1.IAudioRtpCodecCapabilityFinalized;
export type IVideoRtpCodecCapabilityFinalized = proto.saasy.shared.v1.IVideoRtpCodecCapabilityFinalized;
export type IRtpHeaderExtension = proto.saasy.shared.v1.IRtpHeaderExtension;
export type IRtpCapabilities = proto.saasy.shared.v1.IRtpCapabilities;
export type ICreateTransportResponse = proto.saasy.shared.v1.ICreateTransportResponse;
export type IConsumerInfo = proto.saasy.shared.v1.IConsumerInfo;
export type IAudioRtpCodecParameters = proto.saasy.shared.v1.IAudioRtpCodecParameters;
export type IVideoRtpCodecParameters = proto.saasy.shared.v1.IVideoRtpCodecParameters;
export type IRtpHeaderExtensionParameters = proto.saasy.shared.v1.IRtpHeaderExtensionParameters;
export type IRtpEncodingParametersRtx = proto.saasy.shared.v1.IRtpEncodingParametersRtx;
export type IScalabilityMode = proto.saasy.shared.v1.IScalabilityMode;
export type IRtpEncodingParameters = proto.saasy.shared.v1.IRtpEncodingParameters;
export type IRtcpParameters = proto.saasy.shared.v1.IRtcpParameters;
export type IRtpParameters = proto.saasy.shared.v1.IRtpParameters;
export type IRegisterSessionResponse = proto.saasy.shared.v1.IRegisterSessionResponse;
export type IJoinSessionResponse = proto.saasy.shared.v1.IJoinSessionResponse;

export const Protocol = proto.saasy.shared.v1.Protocol;
export const IceCandidateType = proto.saasy.shared.v1.IceCandidateType;
export const IceCandidateTcpType = proto.saasy.shared.v1.IceCandidateTcpType;
export const DtlsRole = proto.saasy.shared.v1.DtlsRole;
export const DtlsFingerprintAlgorithm = proto.saasy.shared.v1.DtlsFingerprintAlgorithm;
export const MimeTypeAudio = proto.saasy.shared.v1.MimeTypeAudio;
export const MimeTypeVideo = proto.saasy.shared.v1.MimeTypeVideo;
export const ParticipantType = proto.saasy.shared.v1.ParticipantType;
export const RtpHeaderExtensionDirection = proto.saasy.shared.v1.RtpHeaderExtensionDirection;
export const RtpHeaderExtensionUri = proto.saasy.shared.v1.RtpHeaderExtensionUri;
export const MediaKind = proto.saasy.shared.v1.MediaKind;
export const TransportDirection = proto.saasy.shared.v1.TransportDirection;
export const ScalabilityModeEnum = proto.saasy.shared.v1.ScalabilityModeEnum;

export * from './conversions';
