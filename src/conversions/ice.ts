import { types } from 'mediasoup-client';
import type {
  IIceCandidate,
  IIceParameters,
} from "../index";
import {
  IceCandidateTcpType,
  IceCandidateType,
  Protocol,
} from "../index";

export function protoToMediasoupProtocol(
  protocol: number,
): types.IceCandidate["protocol"] | null {
  switch (protocol) {
    case Protocol.PROTOCOL_TCP:
      return 'tcp';
    case Protocol.PROTOCOL_UDP:
      return 'udp';
    default:
      console.error('Invalid protocol value', protocol);
      return null;
  }
}


export function protoToMediasoupIceCandidateType(
  type: number,
): types.IceCandidate["type"] | null {
  switch (type) {
    case IceCandidateType.ICE_CANDIDATE_TYPE_HOST:
      return 'host';
    case IceCandidateType.ICE_CANDIDATE_TYPE_SRFLX:
      return 'srflx';
    case IceCandidateType.ICE_CANDIDATE_TYPE_PRFLX:
      return 'prflx';
    case IceCandidateType.ICE_CANDIDATE_TYPE_RELAY:
      return 'relay';
    default:
      console.error('Invalid ICE candidate type value', type);
      return null;
  }
}

export function protoToMediasoupIceCandidateTcpType(
  tcpType: number,
): types.IceCandidate["tcpType"] | null {
  switch (tcpType) {
    case IceCandidateTcpType.ICE_CANDIDATE_TCP_TYPE_PASSIVE:
      return 'passive';
    // Add other TCP types as they become supported
    // case IceCandidateTcpType.ICE_CANDIDATE_TCP_TYPE_ACTIVE:
    //   return 'active';
    // case IceCandidateTcpType.ICE_CANDIDATE_TCP_TYPE_SO:
    //   return 'so';
    default:
      console.error('Invalid ICE candidate TCP type value', tcpType);
      return null;
  }
}

export function protoToMediasoupIceCandidate(
  candidate?: IIceCandidate | null
): types.IceCandidate | null {
  if (!candidate || 
      !candidate.foundation ||
      candidate.priority == null || 
      !candidate.address ||
      !candidate.protocol || 
      candidate.port == null || 
      !candidate.type
  ) {
    console.error('Invalid IceCandidate: missing required fields', candidate);
    return null;
  }

  const protocol = protoToMediasoupProtocol(candidate.protocol);
  if (protocol === null) return null;

  const type = protoToMediasoupIceCandidateType(candidate.type);
  if (type === null) return null;

  const tcpType = candidate.tcpType != null
    ? protoToMediasoupIceCandidateTcpType(candidate.tcpType)
    : undefined;
  if (tcpType === null) return null;

  return {
    foundation: candidate.foundation,
    priority: candidate.priority,
    address: candidate.address,
    ip: candidate.address, // For backward compatibility
    protocol,
    port: candidate.port,
    type,
    tcpType
  };
}

export function protoToMediasoupIceParameters(
  params?: IIceParameters | null
): types.IceParameters | null {
  if (!params || !params.usernameFragment || !params.password) {
    console.error("Invalid IceParameters: missing required fields");
    return null;
  }

  return {
    usernameFragment: params.usernameFragment,
    password: params.password,
    iceLite: !!params.iceLite,
  };
}

