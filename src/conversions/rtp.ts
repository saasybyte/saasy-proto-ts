import { types } from 'mediasoup-client';
import type {
  IAudioRtpCodecCapabilityFinalized,
  IAudioRtpCodecParameters,
  IRtcpFeedback,
  IRtcpParameters,
  IRtpCapabilities,
  IRtpCodecParametersParameters,
  IRtpEncodingParameters,
  IRtpEncodingParametersRtx,
  IRtpHeaderExtension,
  IRtpHeaderExtensionParameters,
  IRtpParameters,
  IScalabilityMode,
  IVideoRtpCodecCapabilityFinalized,
  IVideoRtpCodecParameters,
} from "../index";
import {
  MediaKind,
  MimeTypeAudio,
  MimeTypeVideo,
  RtpHeaderExtensionDirection,
  RtpHeaderExtensionUri,
  ScalabilityModeEnum,
} from "../index";

export function protoToMediasoupRtcpFeedback(
  feedback?: IRtcpFeedback | null
): types.RtcpFeedback | null {
  if (!feedback || !feedback.type) {
    console.error('Invalid RtcpFeedback: missing required fields', feedback);
    return null;
  }

  return {
    type: feedback.type,
    ...(feedback.parameter && { parameter: feedback.parameter })
  };
}

export function mediasoupToProtoRtcpFeedback(
  feedback?: types.RtcpFeedback | null
): IRtcpFeedback | null {
  if (!feedback || !feedback.type) {
    console.error('Invalid RtcpFeedback: missing required fields', feedback);
    return null;
  }

  return {
    type: feedback.type,
    parameter: feedback.parameter || null
  };
}

export function protoToMediasoupCodecParameter(
  param?: IRtpCodecParametersParameters | null
): { key: string; value: string | number } | null {
  if (!param || !param.key) {
    return null;
  }

  if (param.stringValue != null) {
    return { key: param.key, value: param.stringValue };
  } 
  
  if (param.numberValue != null) {
    return { key: param.key, value: param.numberValue };
  }

  return null;
}

export function mediasoupToProtoCodecParameter(
  parameter: { key: string; value: string | number }
): IRtpCodecParametersParameters {
  const param: IRtpCodecParametersParameters = { key: parameter.key };

  if (typeof parameter.value === 'string') {
    param.stringValue = parameter.value;
  } else if (typeof parameter.value === 'number') {
    param.numberValue = parameter.value;
  }

  return param;
}

export function protoToMediasoupAudioMimeType(
  mimeType: number
): string | null {
  switch (mimeType) {
    case MimeTypeAudio.MIME_TYPE_AUDIO_OPUS:
      return 'audio/opus';
    case MimeTypeAudio.MIME_TYPE_AUDIO_MULTI_CHANNEL_OPUS:
      return 'audio/multiopus';
    case MimeTypeAudio.MIME_TYPE_AUDIO_PCMU:
      return 'audio/PCMU';
    case MimeTypeAudio.MIME_TYPE_AUDIO_PCMA:
      return 'audio/PCMA';
    case MimeTypeAudio.MIME_TYPE_AUDIO_ISAC:
      return 'audio/ISAC';
    case MimeTypeAudio.MIME_TYPE_AUDIO_G722:
      return 'audio/G722';
    case MimeTypeAudio.MIME_TYPE_AUDIO_ILBC:
      return 'audio/iLBC';
    case MimeTypeAudio.MIME_TYPE_AUDIO_SILK:
      return 'audio/SILK';
    case MimeTypeAudio.MIME_TYPE_AUDIO_CN:
      return 'audio/CN';
    case MimeTypeAudio.MIME_TYPE_AUDIO_TELEPHONE_EVENT:
      return 'audio/telephone-event';
    case MimeTypeAudio.MIME_TYPE_AUDIO_RTX:
      return 'audio/rtx';
    case MimeTypeAudio.MIME_TYPE_AUDIO_RED:
      return 'audio/red';
    default:
      console.error('Invalid audio MIME type value', mimeType);
      return null;
  }
}

export function mediasoupToProtoAudioMimeType(
  mimeType: string
): number | null {
  const normalized = mimeType.toLowerCase().replace('audio/', '');

  switch (normalized) {
    case 'opus':
      return MimeTypeAudio.MIME_TYPE_AUDIO_OPUS;
    case 'multiopus':
      return MimeTypeAudio.MIME_TYPE_AUDIO_MULTI_CHANNEL_OPUS;
    case 'pcmu':
      return MimeTypeAudio.MIME_TYPE_AUDIO_PCMU;
    case 'pcma':
      return MimeTypeAudio.MIME_TYPE_AUDIO_PCMA;
    case 'isac':
      return MimeTypeAudio.MIME_TYPE_AUDIO_ISAC;
    case 'g722':
      return MimeTypeAudio.MIME_TYPE_AUDIO_G722;
    case 'ilbc':
      return MimeTypeAudio.MIME_TYPE_AUDIO_ILBC;
    case 'silk':
      return MimeTypeAudio.MIME_TYPE_AUDIO_SILK;
    case 'cn':
      return MimeTypeAudio.MIME_TYPE_AUDIO_CN;
    case 'telephone-event':
      return MimeTypeAudio.MIME_TYPE_AUDIO_TELEPHONE_EVENT;
    case 'rtx':
      return MimeTypeAudio.MIME_TYPE_AUDIO_RTX;
    case 'red':
      return MimeTypeAudio.MIME_TYPE_AUDIO_RED;
    default:
      console.error('Invalid audio MIME type string', mimeType);
      return null;
  }
}

export function protoToMediasoupVideoMimeType(
  mimeType: number
): string | null {
  switch (mimeType) {
    case MimeTypeVideo.MIME_TYPE_VIDEO_VP8:
      return 'video/VP8';
    case MimeTypeVideo.MIME_TYPE_VIDEO_VP9:
      return 'video/VP9';
    case MimeTypeVideo.MIME_TYPE_VIDEO_H264:
      return 'video/H264';
    case MimeTypeVideo.MIME_TYPE_VIDEO_AV1:
      return 'video/AV1';
    case MimeTypeVideo.MIME_TYPE_VIDEO_RTX:
      return 'video/rtx';
    case MimeTypeVideo.MIME_TYPE_VIDEO_RED:
      return 'video/red';
    case MimeTypeVideo.MIME_TYPE_VIDEO_ULPFEC:
      return 'video/ulpfec';
    default:
      console.error('Invalid video MIME type value', mimeType);
      return null;
  }
}

export function mediasoupToProtoVideoMimeType(
  mimeType: string
): number | null {
  const normalized = mimeType.toLowerCase().replace('video/', '');

  switch (normalized) {
    case 'vp8':
      return MimeTypeVideo.MIME_TYPE_VIDEO_VP8;
    case 'vp9':
      return MimeTypeVideo.MIME_TYPE_VIDEO_VP9;
    case 'h264':
      return MimeTypeVideo.MIME_TYPE_VIDEO_H264;
    case 'av1':
      return MimeTypeVideo.MIME_TYPE_VIDEO_AV1;
    case 'rtx':
      return MimeTypeVideo.MIME_TYPE_VIDEO_RTX;
    case 'red':
      return MimeTypeVideo.MIME_TYPE_VIDEO_RED;
    case 'ulpfec':
      return MimeTypeVideo.MIME_TYPE_VIDEO_ULPFEC;
    default:
      console.error('Invalid video MIME type string', mimeType);
      return null;
  }
}

export function protoToMediasoupAudioRtpCodecCapability(
  codec?: IAudioRtpCodecCapabilityFinalized | null
): types.RtpCodecCapability | null {
  if (!codec || codec.mimeType == null || codec.preferredPayloadType == null || codec.clockRate == null) {
    console.error('Invalid AudioRtpCodecCapabilityFinalized: missing required fields', codec);
    return null;
  }

  const mimeType = protoToMediasoupAudioMimeType(codec.mimeType);
  if (mimeType === null) return null;

  let parameters: Record<string, string | number> | undefined = undefined;
  if (codec.parameters && codec.parameters.length > 0) {
    parameters = {};
    for (const param of codec.parameters) {
      const result = protoToMediasoupCodecParameter(param);
      if (result) {
        parameters[result.key] = result.value;
      }
    }
    // If no valid parameters were found, set to undefined
    if (Object.keys(parameters).length === 0) {
      parameters = undefined;
    }
  }

  let rtcpFeedback: types.RtcpFeedback[] | undefined = undefined;
  if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
    rtcpFeedback = [];
    for (const feedback of codec.rtcpFeedback) {
      const result = protoToMediasoupRtcpFeedback(feedback);
      if (result) {
        rtcpFeedback.push(result);
      }
    }
    // If no valid feedback was found, set to undefined
    if (rtcpFeedback.length === 0) {
      rtcpFeedback = undefined;
    }
  }

  return {
    kind: 'audio',
    mimeType,
    clockRate: codec.clockRate,
    preferredPayloadType: codec.preferredPayloadType,
    ...(codec.channels != null && { channels: codec.channels }),
    ...(parameters && { parameters }),
    ...(rtcpFeedback && { rtcpFeedback })
  };
}

export function mediasoupToProtoAudioRtpCodecCapability(
  codec: types.RtpCodecCapability
): IAudioRtpCodecCapabilityFinalized | null {
  if (codec.kind !== 'audio' || !codec.mimeType || codec.clockRate == null) {
    console.error('Invalid or non-audio RtpCodecCapability', codec);
    return null;
  }

  const mimeType = mediasoupToProtoAudioMimeType(codec.mimeType);
  if (mimeType === null) return null;

  const result: IAudioRtpCodecCapabilityFinalized = {
    mimeType,
    clockRate: codec.clockRate
  };

  if (codec.preferredPayloadType != null) {
    result.preferredPayloadType = codec.preferredPayloadType;
  }
  
  if (codec.channels != null) {
    result.channels = codec.channels;
  }

  if (codec.parameters && Object.keys(codec.parameters).length > 0) {
    result.parameters = [];
    for (const [key, value] of Object.entries(codec.parameters)) {
      if (value != null) {
        if (typeof value === 'string' || typeof value === 'number') {
          result.parameters.push(mediasoupToProtoCodecParameter({ key, value }));
        } else {
          result.parameters.push(mediasoupToProtoCodecParameter({ 
            key, 
            value: String(value) 
          }));
        }
      }
    }
  }

  if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
    result.rtcpFeedback = [];
    for (const feedback of codec.rtcpFeedback) {
      const protoFeedback = mediasoupToProtoRtcpFeedback(feedback);
      if (protoFeedback) {
        result.rtcpFeedback.push(protoFeedback);
      }
    }
  }

  return result;
}

export function protoToMediasoupVideoRtpCodecCapability(
  codec?: IVideoRtpCodecCapabilityFinalized | null
): types.RtpCodecCapability | null {
  if (!codec || codec.mimeType == null || codec.preferredPayloadType == null || codec.clockRate == null) {
    console.error('Invalid VideoRtpCodecCapabilityFinalized: missing required fields', codec);
    return null;
  }

  const mimeType = protoToMediasoupVideoMimeType(codec.mimeType);
  if (mimeType === null) return null;

  let parameters: Record<string, string | number> | undefined = undefined;
  if (codec.parameters && codec.parameters.length > 0) {
    parameters = {};
    for (const param of codec.parameters) {
      const result = protoToMediasoupCodecParameter(param);
      if (result) {
        parameters[result.key] = result.value;
      }
    }
    // If no valid parameters were found, set to undefined
    if (Object.keys(parameters).length === 0) {
      parameters = undefined;
    }
  }

  let rtcpFeedback: types.RtcpFeedback[] | undefined = undefined;
  if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
    rtcpFeedback = [];
    for (const feedback of codec.rtcpFeedback) {
      const result = protoToMediasoupRtcpFeedback(feedback);
      if (result) {
        rtcpFeedback.push(result);
      }
    }
    // If no valid feedback was found, set to undefined
    if (rtcpFeedback.length === 0) {
      rtcpFeedback = undefined;
    }
  }

  return {
    kind: 'video',
    mimeType,
    clockRate: codec.clockRate,
    preferredPayloadType: codec.preferredPayloadType,
    ...(parameters && { parameters }),
    ...(rtcpFeedback && { rtcpFeedback })
  };
}

export function mediasoupToProtoVideoRtpCodecCapability(
  codec: types.RtpCodecCapability
): IVideoRtpCodecCapabilityFinalized | null {
  if (codec.kind !== 'video' || !codec.mimeType || codec.clockRate == null) {
    console.error('Invalid or non-video RtpCodecCapability', codec);
    return null;
  }

  const mimeType = mediasoupToProtoVideoMimeType(codec.mimeType);
  if (mimeType === null) return null;

  const result: IVideoRtpCodecCapabilityFinalized = {
    mimeType,
    clockRate: codec.clockRate
  };

  if (codec.preferredPayloadType != null) {
    result.preferredPayloadType = codec.preferredPayloadType;
  }
  
  if (codec.parameters && Object.keys(codec.parameters).length > 0) {
    result.parameters = [];
    for (const [key, value] of Object.entries(codec.parameters)) {
      if (value != null) {
        if (typeof value === 'string' || typeof value === 'number') {
          result.parameters.push(mediasoupToProtoCodecParameter({ key, value }));
        } else {
          result.parameters.push(mediasoupToProtoCodecParameter({ 
            key, 
            value: String(value) 
          }));
        }
      }
    }
  }

  if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
    result.rtcpFeedback = [];
    for (const feedback of codec.rtcpFeedback) {
      const protoFeedback = mediasoupToProtoRtcpFeedback(feedback);
      if (protoFeedback) {
        result.rtcpFeedback.push(protoFeedback);
      }
    }
  }

  return result;
}

export function protoToMediasoupRtpHeaderExtensionDirection(
  direction: number
): types.RtpHeaderExtensionDirection | null {
  switch (direction) {
    case RtpHeaderExtensionDirection.RTP_HEADER_EXTENSION_DIRECTION_SEND_RECV:
      return 'sendrecv';
    case RtpHeaderExtensionDirection.RTP_HEADER_EXTENSION_DIRECTION_SEND_ONLY:
      return 'sendonly';
    case RtpHeaderExtensionDirection.RTP_HEADER_EXTENSION_DIRECTION_RECV_ONLY:
      return 'recvonly';
    case RtpHeaderExtensionDirection.RTP_HEADER_EXTENSION_DIRECTION_INACTIVE:
      return 'inactive';
    default:
      console.error('Invalid RTP header extension direction value', direction);
      return null;
  }
}

export function mediasoupToProtoRtpHeaderExtensionDirection(
  direction: string
): number | null {
  switch (direction) {
    case 'sendrecv':
      return RtpHeaderExtensionDirection.RTP_HEADER_EXTENSION_DIRECTION_SEND_RECV;
    case 'sendonly':
      return RtpHeaderExtensionDirection.RTP_HEADER_EXTENSION_DIRECTION_SEND_ONLY;
    case 'recvonly':
      return RtpHeaderExtensionDirection.RTP_HEADER_EXTENSION_DIRECTION_RECV_ONLY;
    case 'inactive':
      return RtpHeaderExtensionDirection.RTP_HEADER_EXTENSION_DIRECTION_INACTIVE;
    default:
      console.error('Invalid RTP header extension direction string', direction);
      return null;
  }
}

export function protoToMediasoupRtpHeaderExtensionUri(
  uri: number
): types.RtpHeaderExtensionUri | null {
  switch (uri) {
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_MID:
      return 'urn:ietf:params:rtp-hdrext:sdes:mid';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_RTP_STREAM_ID:
      return 'urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_REPAIR_RTP_STREAM_ID:
      return 'urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_AUDIO_LEVEL:
      return 'urn:ietf:params:rtp-hdrext:ssrc-audio-level';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_VIDEO_ORIENTATION:
      return 'urn:3gpp:video-orientation';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_TIME_OFFSET:
      return 'urn:ietf:params:rtp-hdrext:toffset';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_TRANSPORT_WIDE_CC_DRAFT01:
      return 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_ABS_SEND_TIME:
      return 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_ABS_CAPTURE_TIME:
      return 'http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_PLAYOUT_DELAY:
      return 'http://www.webrtc.org/experiments/rtp-hdrext/playout-delay';
    case RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_DEPENDENCY_DESCRIPTOR:
      return 'https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension'
    default:
      console.error('Invalid RTP header extension URI value', uri);
      return null;
  }
}

export function mediasoupToProtoRtpHeaderExtensionUri(
  uri: string
): number | null {
  switch (uri) {
    case 'urn:ietf:params:rtp-hdrext:sdes:mid':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_MID;
    case 'urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_RTP_STREAM_ID;
    case 'urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_REPAIR_RTP_STREAM_ID;
    case 'urn:ietf:params:rtp-hdrext:ssrc-audio-level':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_AUDIO_LEVEL;
    case 'urn:3gpp:video-orientation':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_VIDEO_ORIENTATION;
    case 'urn:ietf:params:rtp-hdrext:toffset':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_TIME_OFFSET;
    case 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_TRANSPORT_WIDE_CC_DRAFT01;
    case 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_ABS_SEND_TIME;
    case 'http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_ABS_CAPTURE_TIME;
    case 'http://www.webrtc.org/experiments/rtp-hdrext/playout-delay':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_PLAYOUT_DELAY;
    case 'https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension':
      return RtpHeaderExtensionUri.RTP_HEADER_EXTENSION_URI_DEPENDENCY_DESCRIPTOR;
    default:
      console.error('Invalid RTP header extension URI string', uri);
      return null;
  }
}

export function protoToMediasoupMediaKind(
  kind: number
): types.MediaKind | null {
  switch (kind) {
    case MediaKind.MEDIA_KIND_AUDIO:
      return 'audio';
    case MediaKind.MEDIA_KIND_VIDEO:
      return 'video';
    default:
      console.error('Invalid media kind value', kind);
      return null;
  }
}

export function mediasoupToProtoMediaKind(
  kind: string
): number | null {
  switch (kind) {
    case 'audio':
      return MediaKind.MEDIA_KIND_AUDIO;
    case 'video':
      return MediaKind.MEDIA_KIND_VIDEO;
    default:
      console.error('Invalid media kind string', kind);
      return null;
  }
}

export function protoToMediasoupRtpHeaderExtension(
  extension?: IRtpHeaderExtension | null
): types.RtpHeaderExtension | null {
  if (!extension || 
      extension.uri == null || 
      extension.preferredId == null || 
      extension.kind == null) {
    console.error('Invalid RtpHeaderExtension: missing required fields', extension);
    return null;
  }

  const uri = protoToMediasoupRtpHeaderExtensionUri(extension.uri);
  if (uri === null) return null;

  const kind = protoToMediasoupMediaKind(extension.kind);
  if (kind === null) return null;

  let direction: types.RtpHeaderExtensionDirection | undefined = undefined;
  if (extension.direction != null) {
    const convertedDirection = protoToMediasoupRtpHeaderExtensionDirection(extension.direction);
    if (convertedDirection === null) return null;
    direction = convertedDirection;
  }

  return {
    uri,
    preferredId: extension.preferredId,
    kind,
    ...(extension.preferredEncrypt != null && { preferredEncrypt: extension.preferredEncrypt }),
    ...(direction && { direction })
  };
}

export function mediasoupToProtoRtpHeaderExtension(
  extension: types.RtpHeaderExtension
): IRtpHeaderExtension | null {
  if (!extension.uri || extension.preferredId == null || !extension.kind) {
    console.error('Invalid RtpHeaderExtension: missing required fields', extension);
    return null;
  }

  const uri = mediasoupToProtoRtpHeaderExtensionUri(extension.uri);
  if (uri === null) return null;

  const kind = mediasoupToProtoMediaKind(extension.kind);
  if (kind === null) return null;

  const result: IRtpHeaderExtension = {
    uri,
    preferredId: extension.preferredId,
    kind
  };

  if (extension.preferredEncrypt != null) {
    result.preferredEncrypt = extension.preferredEncrypt;
  }

  if (extension.direction) {
    const direction = mediasoupToProtoRtpHeaderExtensionDirection(extension.direction);
    if (direction === null) return null;
    result.direction = direction;
  }

  return result;
}

export function protoToMediasoupRtpCapabilities(
  capabilities?: IRtpCapabilities | null
): types.RtpCapabilities | null {
  if (!capabilities) {
    console.error('Invalid RtpCapabilities: missing required fields', capabilities);
    return null;
  }

  const result: types.RtpCapabilities = {};

  if (capabilities.codecs && capabilities.codecs.length > 0) {
    result.codecs = [];
    for (const codec of capabilities.codecs) {
      let convertedCodec: types.RtpCodecCapability | null = null;
      if (codec.audio) {
        convertedCodec = protoToMediasoupAudioRtpCodecCapability(codec.audio);
      } else if (codec.video) {
        convertedCodec = protoToMediasoupVideoRtpCodecCapability(codec.video);
      }
      
      if (convertedCodec) {
        result.codecs.push(convertedCodec);
      }
    }
    
    // If no valid codecs were found, remove the property
    if (result.codecs.length === 0) {
      delete result.codecs;
    }
  }

  if (capabilities.headerExtensions && capabilities.headerExtensions.length > 0) {
    result.headerExtensions = [];
    for (const ext of capabilities.headerExtensions) {
      const convertedExt = protoToMediasoupRtpHeaderExtension(ext);
      if (convertedExt) {
        result.headerExtensions.push(convertedExt);
      }
    }
    
    // If no valid header extensions were found, remove the property
    if (result.headerExtensions.length === 0) {
      delete result.headerExtensions;
    }
  }

  return result;
}

export function mediasoupToProtoRtpCapabilities(
  capabilities: types.RtpCapabilities
): IRtpCapabilities | null {
  if (!capabilities) {
    console.error('Invalid RtpCapabilities', capabilities);
    return null;
  }

  const result: IRtpCapabilities = {};

  if (capabilities.codecs && capabilities.codecs.length > 0) {
    result.codecs = [];
    
    for (const codec of capabilities.codecs) {
      if (codec.kind === 'audio') {
        const audioCodec = mediasoupToProtoAudioRtpCodecCapability(codec);
        if (audioCodec) {
          result.codecs.push({
            audio: audioCodec
          });
        }
      } else if (codec.kind === 'video') {
        const videoCodec = mediasoupToProtoVideoRtpCodecCapability(codec);
        if (videoCodec) {
          result.codecs.push({
            video: videoCodec
          });
        }
      }
    }
    
    // If no valid codecs were converted, set to null
    if (result.codecs.length === 0) {
      result.codecs = null;
    }
  }

  if (capabilities.headerExtensions && capabilities.headerExtensions.length > 0) {
    result.headerExtensions = [];
    
    for (const ext of capabilities.headerExtensions) {
      const convertedExt = mediasoupToProtoRtpHeaderExtension(ext);
      if (convertedExt) {
        result.headerExtensions.push(convertedExt);
      }
    }
    
    // If no valid header extensions were converted, set to null
    if (result.headerExtensions.length === 0) {
      result.headerExtensions = null;
    }
  }

  return result;
}

export function protoToMediasoupAudioRtpCodecParameters(
  codec?: IAudioRtpCodecParameters | null
): types.RtpCodecParameters | null {
  if (!codec || codec.mimeType == null || codec.payloadType == null || codec.clockRate == null) {
    console.error('Invalid AudioRtpCodecParameters: missing required fields', codec);
    return null;
  }

  const mimeType = protoToMediasoupAudioMimeType(codec.mimeType);
  if (mimeType === null) return null;

  let parameters: Record<string, string | number> | undefined = undefined;
  if (codec.parameters && codec.parameters.length > 0) {
    parameters = {};
    for (const param of codec.parameters) {
      const result = protoToMediasoupCodecParameter(param);
      if (result) {
        parameters[result.key] = result.value;
      }
    }
    // If no valid parameters were found, set to undefined
    if (Object.keys(parameters).length === 0) {
      parameters = undefined;
    }
  }

  let rtcpFeedback: types.RtcpFeedback[] | undefined = undefined;
  if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
    rtcpFeedback = [];
    for (const feedback of codec.rtcpFeedback) {
      const result = protoToMediasoupRtcpFeedback(feedback);
      if (result) {
        rtcpFeedback.push(result);
      }
    }
    // If no valid feedback was found, set to undefined
    if (rtcpFeedback.length === 0) {
      rtcpFeedback = undefined;
    }
  }

  return {
    mimeType,
    clockRate: codec.clockRate,
    payloadType: codec.payloadType,
    ...(codec.channels != null && { channels: codec.channels }),
    ...(parameters && { parameters }),
    ...(rtcpFeedback && { rtcpFeedback })
  };
}

export function mediasoupToProtoAudioRtpCodecParameters(
  codec: types.RtpCodecParameters
): IAudioRtpCodecParameters | null {
  if (!codec.mimeType || codec.payloadType == null || codec.clockRate == null) {
    console.error('Invalid or non-audio RtpCodecParameters', codec);
    return null;
  }

  const mimeType = mediasoupToProtoAudioMimeType(codec.mimeType);
  if (mimeType === null) return null;

  const result: IAudioRtpCodecParameters = {
    mimeType,
    clockRate: codec.clockRate
  };

  if (codec.payloadType != null) {
    result.payloadType = codec.payloadType;
  }
  
  if (codec.channels != null) {
    result.channels = codec.channels;
  }

  if (codec.parameters && Object.keys(codec.parameters).length > 0) {
    result.parameters = [];
    for (const [key, value] of Object.entries(codec.parameters)) {
      if (value != null) {
        if (typeof value === 'string' || typeof value === 'number') {
          result.parameters.push(mediasoupToProtoCodecParameter({ key, value }));
        } else {
          result.parameters.push(mediasoupToProtoCodecParameter({ 
            key, 
            value: String(value) 
          }));
        }
      }
    }
  }

  if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
    result.rtcpFeedback = [];
    for (const feedback of codec.rtcpFeedback) {
      const protoFeedback = mediasoupToProtoRtcpFeedback(feedback);
      if (protoFeedback) {
        result.rtcpFeedback.push(protoFeedback);
      }
    }
  }

  return result;
}

export function protoToMediasoupVideoRtpCodecParameters(
  codec?: IVideoRtpCodecParameters | null
): types.RtpCodecParameters | null {
  if (!codec || codec.mimeType == null || codec.payloadType == null || codec.clockRate == null) {
    console.error('Invalid VideoRtpCodecParameters: missing required fields', codec);
    return null;
  }

  const mimeType = protoToMediasoupVideoMimeType(codec.mimeType);
  if (mimeType === null) return null;

  let parameters: Record<string, string | number> | undefined = undefined;
  if (codec.parameters && codec.parameters.length > 0) {
    parameters = {};
    for (const param of codec.parameters) {
      const result = protoToMediasoupCodecParameter(param);
      if (result) {
        parameters[result.key] = result.value;
      }
    }
    // If no valid parameters were found, set to undefined
    if (Object.keys(parameters).length === 0) {
      parameters = undefined;
    }
  }

  let rtcpFeedback: types.RtcpFeedback[] | undefined = undefined;
  if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
    rtcpFeedback = [];
    for (const feedback of codec.rtcpFeedback) {
      const result = protoToMediasoupRtcpFeedback(feedback);
      if (result) {
        rtcpFeedback.push(result);
      }
    }
    // If no valid feedback was found, set to undefined
    if (rtcpFeedback.length === 0) {
      rtcpFeedback = undefined;
    }
  }

  return {
    mimeType,
    clockRate: codec.clockRate,
    payloadType: codec.payloadType,
    ...(parameters && { parameters }),
    ...(rtcpFeedback && { rtcpFeedback })
  };
}

export function mediasoupToProtoVideoRtpCodecParameters(
  codec: types.RtpCodecParameters
): IVideoRtpCodecParameters | null {
  if (!codec.mimeType || codec.payloadType == null || codec.clockRate == null) {
    console.error('Invalid or non-video RtpCodecParameters', codec);
    return null;
  }

  const mimeType = mediasoupToProtoVideoMimeType(codec.mimeType);
  if (mimeType === null) return null;

  const result: IVideoRtpCodecParameters = {
    mimeType,
    clockRate: codec.clockRate
  };

  if (codec.payloadType != null) {
    result.payloadType = codec.payloadType;
  }

  if (codec.parameters && Object.keys(codec.parameters).length > 0) {
    result.parameters = [];
    for (const [key, value] of Object.entries(codec.parameters)) {
      if (value != null) {
        if (typeof value === 'string' || typeof value === 'number') {
          result.parameters.push(mediasoupToProtoCodecParameter({ key, value }));
        } else {
          result.parameters.push(mediasoupToProtoCodecParameter({ 
            key, 
            value: String(value) 
          }));
        }
      }
    }
  }

  if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
    result.rtcpFeedback = [];
    for (const feedback of codec.rtcpFeedback) {
      const protoFeedback = mediasoupToProtoRtcpFeedback(feedback);
      if (protoFeedback) {
        result.rtcpFeedback.push(protoFeedback);
      }
    }
  }

  return result;
}

export function protoToMediasoupRtpHeaderExtensionParameters(
  params?: IRtpHeaderExtensionParameters | null
): types.RtpHeaderExtensionParameters | null {
  if (!params || params.id == null || params.uri == null) {
    console.error('Invalid RtpHeaderExtensionParameters: missing required fields', params);
    return null;
  }

  const uri = protoToMediasoupRtpHeaderExtensionUri(params.uri);
  if (uri === null) return null;

  return {
    uri,
    id: params.id,
    ...(params.encrypt != null && { encrypt: params.encrypt })
  };
}

export function mediasoupToProtoRtpHeaderExtensionParameters(
  params: types.RtpHeaderExtensionParameters
): IRtpHeaderExtensionParameters | null {
  if (!params.uri || params.id == null) {
    console.error('Invalid RtpHeaderExtensionParameters: missing required fields', params);
    return null;
  }

  const uri = mediasoupToProtoRtpHeaderExtensionUri(params.uri);
  if (uri === null) return null;

  const result: IRtpHeaderExtensionParameters = {
    uri,
    id: params.id
  };

  if (params.encrypt != null) {
    result.encrypt = params.encrypt;
  }

  return result;
}

export function protoToMediasoupRtpEncodingParametersRtx(
  rtx?: IRtpEncodingParametersRtx | null
): { ssrc: number } | null {
  if (!rtx || rtx.ssrc == null) {
    console.error('Invalid RtpEncodingParametersRtx: missing required fields', rtx);
    return null;
  }

  return {
    ssrc: rtx.ssrc
  };
}

export function mediasoupToProtoRtpEncodingParametersRtx(
  rtx: { ssrc: number }
): IRtpEncodingParametersRtx | null {
  if (!rtx || rtx.ssrc == null) {
    console.error('Invalid rtx parameters: missing required fields', rtx);
    return null;
  }

  return {
    ssrc: rtx.ssrc
  };
}

export function protoToMediasoupScalabilityMode(
  scalability?: IScalabilityMode | null
): string | null {
  if (!scalability || scalability.predefined == null) {
    return null;
  }

  switch (scalability.predefined) {
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_NONE:
      return null; // No scalability mode
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L1T2:
      return 'L1T2';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L1T2H:
      return 'L1T2h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L1T3:
      return 'L1T3';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L1T3H:
      return 'L1T3h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T1:
      return 'L2T1';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T1H:
      return 'L2T1h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T1_KEY:
      return 'L2T1_KEY';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T2:
      return 'L2T2';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T2H:
      return 'L2T2h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T2_KEY:
      return 'L2T2_KEY';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T2_KEY_SHIFT:
      return 'L2T2_KEY_SHIFT';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T3:
      return 'L2T3';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T3H:
      return 'L2T3h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T3_KEY:
      return 'L2T3_KEY';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T3_KEY_SHIFT:
      return 'L2T3_KEY_SHIFT';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T1:
      return 'L3T1';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T1H:
      return 'L3T1h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T1_KEY:
      return 'L3T1_KEY';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T2:
      return 'L3T2';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T2H:
      return 'L3T2h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T2_KEY:
      return 'L3T2_KEY';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T2_KEY_SHIFT:
      return 'L3T2_KEY_SHIFT';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T3:
      return 'L3T3';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T3H:
      return 'L3T3h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T3_KEY:
      return 'L3T3_KEY';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T3_KEY_SHIFT:
      return 'L3T3_KEY_SHIFT';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T1:
      return 'S2T1';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T1H:
      return 'S2T1h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T2:
      return 'S2T2';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T2H:
      return 'S2T2h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T3:
      return 'S2T3';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T3H:
      return 'S2T3h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T1:
      return 'S3T1';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T1H:
      return 'S3T1h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T2:
      return 'S3T2';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T2H:
      return 'S3T2h';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T3:
      return 'S3T3';
    case ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T3H:
      return 'S3T3h';
    default:
      console.error('Invalid ScalabilityModeEnum value', scalability.predefined);
      return null;
  }
}

export function mediasoupToProtoScalabilityMode(
  scalabilityMode?: string | null
): IScalabilityMode | null {
  if (!scalabilityMode) {
    return { predefined: ScalabilityModeEnum.SCALABILITY_MODE_ENUM_NONE };
  }

  let predefined: number;
  switch (scalabilityMode) {
    case 'L1T2':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L1T2;
      break;
    case 'L1T2h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L1T2H;
      break;
    case 'L1T3':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L1T3;
      break;
    case 'L1T3h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L1T3H;
      break;
    case 'L2T1':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T1;
      break;
    case 'L2T1h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T1H;
      break;
    case 'L2T1_KEY':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T1_KEY;
      break;
    case 'L2T2':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T2;
      break;
    case 'L2T2h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T2H;
      break;
    case 'L2T2_KEY':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T2_KEY;
      break;
    case 'L2T2_KEY_SHIFT':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T2_KEY_SHIFT;
      break;
    case 'L2T3':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T3;
      break;
    case 'L2T3h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T3H;
      break;
    case 'L2T3_KEY':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T3_KEY;
      break;
    case 'L2T3_KEY_SHIFT':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L2T3_KEY_SHIFT;
      break;
    case 'L3T1':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T1;
      break;
    case 'L3T1h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T1H;
      break;
    case 'L3T1_KEY':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T1_KEY;
      break;
    case 'L3T2':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T2;
      break;
    case 'L3T2h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T2H;
      break;
    case 'L3T2_KEY':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T2_KEY;
      break;
    case 'L3T2_KEY_SHIFT':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T2_KEY_SHIFT;
      break;
    case 'L3T3':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T3;
      break;
    case 'L3T3h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T3H;
      break;
    case 'L3T3_KEY':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T3_KEY;
      break;
    case 'L3T3_KEY_SHIFT':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_L3T3_KEY_SHIFT;
      break;
    case 'S2T1':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T1;
      break;
    case 'S2T1h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T1H;
      break;
    case 'S2T2':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T2;
      break;
    case 'S2T2h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T2H;
      break;
    case 'S2T3':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T3;
      break;
    case 'S2T3h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S2T3H;
      break;
    case 'S3T1':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T1;
      break;
    case 'S3T1h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T1H;
      break;
    case 'S3T2':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T2;
      break;
    case 'S3T2h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T2H;
      break;
    case 'S3T3':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T3;
      break;
    case 'S3T3h':
      predefined = ScalabilityModeEnum.SCALABILITY_MODE_ENUM_S3T3H;
      break;
    default:
      console.error('Invalid scalability mode string', scalabilityMode);
      return null;
  }

  return { predefined };
}

export function protoToMediasoupRtpEncodingParameters(
  params?: IRtpEncodingParameters | null
): types.RtpEncodingParameters | null {
  if (!params) {
    return null;
  }

  const result: types.RtpEncodingParameters = {};

  if (params.ssrc != null) {
    result.ssrc = params.ssrc;
  }

  if (params.rid != null) {
    result.rid = params.rid;
  }

  if (params.codecPayloadType != null) {
    result.codecPayloadType = params.codecPayloadType;
  }

  if (params.dtx != null) {
    result.dtx = params.dtx;
  }

  if (params.maxBitrate != null) {
    result.maxBitrate = params.maxBitrate;
  }

  if (params.rtx) {
    const rtx = protoToMediasoupRtpEncodingParametersRtx(params.rtx);
    if (rtx) {
      result.rtx = rtx;
    }
  }

  if (params.scalabilityMode) {
    const scalabilityMode = protoToMediasoupScalabilityMode(params.scalabilityMode);
    if (scalabilityMode) {
      result.scalabilityMode = scalabilityMode;
    }
  }

  return result;
}

export function mediasoupToProtoRtpEncodingParameters(
  params: types.RtpEncodingParameters
): IRtpEncodingParameters | null {
  if (!params) {
    return null;
  }

  const result: IRtpEncodingParameters = {};

  if (params.ssrc != null) {
    result.ssrc = params.ssrc;
  }

  if (params.rid != null) {
    result.rid = params.rid;
  }

  if (params.codecPayloadType != null) {
    result.codecPayloadType = params.codecPayloadType;
  }

  if (params.dtx != null) {
    result.dtx = params.dtx;
  }

  if (params.maxBitrate != null) {
    result.maxBitrate = params.maxBitrate;
  }

  if (params.rtx) {
    const rtx = mediasoupToProtoRtpEncodingParametersRtx(params.rtx);
    if (rtx) {
      result.rtx = rtx;
    }
  }

  if (params.scalabilityMode) {
    const scalabilityMode = mediasoupToProtoScalabilityMode(params.scalabilityMode);
    if (scalabilityMode) {
      result.scalabilityMode = scalabilityMode;
    }
  }

  return result;
}

export function protoToMediasoupRtcpParameters(
  params?: IRtcpParameters | null
): types.RtcpParameters | null {
  if (!params) {
    return null;
  }

  const result: types.RtcpParameters = {};

  if (params.cname != null) {
    result.cname = params.cname;
  }

  if (params.reducedSize != null) {
    result.reducedSize = params.reducedSize;
  }

  return result;
}

export function mediasoupToProtoRtcpParameters(
  params: types.RtcpParameters
): IRtcpParameters | null {
  if (!params) {
    return null;
  }

  const result: IRtcpParameters = {};

  if (params.cname != null) {
    result.cname = params.cname;
  }

  if (params.reducedSize != null) {
    result.reducedSize = params.reducedSize;
  }

  return result;
}

export function protoToMediasoupRtpParameters(
  params?: IRtpParameters | null
): types.RtpParameters | null {
  if (!params) {
    return null;
  }

  if (!params.codecs || params.codecs.length === 0) {
    console.error('Invalid RtpParameters: codecs is required', params);
    return null;
  }

  const codecs: types.RtpCodecParameters[] = [];
  for (const codec of params.codecs) {
    let convertedCodec: types.RtpCodecParameters | null = null;
    if (codec.audio) {
      convertedCodec = protoToMediasoupAudioRtpCodecParameters(codec.audio);
    } else if (codec.video) {
      convertedCodec = protoToMediasoupVideoRtpCodecParameters(codec.video);
    }
    
    if (convertedCodec) {
      codecs.push(convertedCodec);
    }
  }

  if (codecs.length === 0) {
    console.error('Invalid RtpParameters: no valid codecs found', params);
    return null;
  }

  const result: types.RtpParameters = {
    codecs
  };

  if (params.mid != null) {
    result.mid = params.mid;
  }

  if (params.headerExtensions && params.headerExtensions.length > 0) {
    result.headerExtensions = [];
    for (const ext of params.headerExtensions) {
      const convertedExt = protoToMediasoupRtpHeaderExtensionParameters(ext);
      if (convertedExt) {
        result.headerExtensions.push(convertedExt);
      }
    }
    
    // If no valid header extensions were found, remove the property
    if (result.headerExtensions.length === 0) {
      delete result.headerExtensions;
    }
  }

  if (params.encodings && params.encodings.length > 0) {
    result.encodings = [];
    for (const encoding of params.encodings) {
      const convertedEncoding = protoToMediasoupRtpEncodingParameters(encoding);
      if (convertedEncoding) {
        result.encodings.push(convertedEncoding);
      }
    }
    
    // If no valid encodings were found, remove the property
    if (result.encodings.length === 0) {
      delete result.encodings;
    }
  }

  if (params.rtcp) {
    const rtcp = protoToMediasoupRtcpParameters(params.rtcp);
    if (rtcp) {
      result.rtcp = rtcp;
    }
  }

  return result;
}

export function mediasoupToProtoRtpParameters(
  params: types.RtpParameters
): IRtpParameters | null {
  if (!params || !params.codecs || params.codecs.length === 0) {
    console.error('Invalid RtpParameters: codecs is required', params);
    return null;
  }

  const result: IRtpParameters = {
    codecs: []
  };

  for (const codec of params.codecs) {
    if (codec.mimeType?.startsWith('audio/')) {
      const audioCodec = mediasoupToProtoAudioRtpCodecParameters(codec);
      if (audioCodec) {
        result.codecs!.push({
          audio: audioCodec
        });
      }
    } else if (codec.mimeType?.startsWith('video/')) {
      const videoCodec = mediasoupToProtoVideoRtpCodecParameters(codec);
      if (videoCodec) {
        result.codecs!.push({
          video: videoCodec
        });
      }
    }
  }

  if (result.codecs!.length === 0) {
    console.error('Invalid RtpParameters: no valid codecs converted', params);
    return null;
  }

  if (params.mid != null) {
    result.mid = params.mid;
  }

  if (params.headerExtensions && params.headerExtensions.length > 0) {
    result.headerExtensions = [];
    for (const ext of params.headerExtensions) {
      const convertedExt = mediasoupToProtoRtpHeaderExtensionParameters(ext);
      if (convertedExt) {
        result.headerExtensions.push(convertedExt);
      }
    }
    
    // If no valid header extensions were converted, set to null
    if (result.headerExtensions.length === 0) {
      result.headerExtensions = null;
    }
  }

  if (params.encodings && params.encodings.length > 0) {
    result.encodings = [];
    for (const encoding of params.encodings) {
      const convertedEncoding = mediasoupToProtoRtpEncodingParameters(encoding);
      if (convertedEncoding) {
        result.encodings.push(convertedEncoding);
      }
    }
    
    // If no valid encodings were converted, set to null
    if (result.encodings.length === 0) {
      result.encodings = null;
    }
  }

  if (params.rtcp) {
    const rtcp = mediasoupToProtoRtcpParameters(params.rtcp);
    if (rtcp) {
      result.rtcp = rtcp;
    }
  }

  return result;
}
