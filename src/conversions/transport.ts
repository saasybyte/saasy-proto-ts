import { types } from 'mediasoup-client';
import type {
  ICreateTransportResponse,
  IDtlsFingerprint,
  IDtlsParameters,
} from "../index";
import {
  DtlsFingerprintAlgorithm,
  DtlsRole,
} from "../index";
import {
  protoToMediasoupIceCandidate,
  protoToMediasoupIceParameters,
} from './ice';

export function protoToMediasoupDtlsRole(
  role: number,
): types.DtlsRole | null {
  switch (role) {
    case DtlsRole.DTLS_ROLE_AUTO:
      return 'auto';
    case DtlsRole.DTLS_ROLE_CLIENT:
      return 'client';
    case DtlsRole.DTLS_ROLE_SERVER:
      return 'server';
    default:
      console.error('Invalid DTLS role value', role);
      return null;
  }
}

export function mediasoupToProtoDtlsRole(
  role: types.DtlsRole
): number | null {
  switch (role) {
    case 'auto':
      return DtlsRole.DTLS_ROLE_AUTO;
    case 'client':
      return DtlsRole.DTLS_ROLE_CLIENT;
    case 'server':
      return DtlsRole.DTLS_ROLE_SERVER;
    default:
      console.error('Invalid DTLS role string', role);
      return null;
  }
}

export function protoToMediasoupFingerprintAlgorithm(
  algorithm: number
): types.FingerprintAlgorithm | null {
  switch (algorithm) {
    case DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA1:
      return 'sha-1';
    case DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA224:
      return 'sha-224';
    case DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA256:
      return 'sha-256';
    case DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA384:
      return 'sha-384';
    case DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA512:
      return 'sha-512';
    default:
      console.error('Invalid DTLS fingerprint algorithm value', algorithm);
      return null;
  }
}

export function mediasoupToProtoFingerprintAlgorithm(
  algorithm: types.FingerprintAlgorithm
): number | null {
  switch (algorithm) {
    case 'sha-1':
      return DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA1;
    case 'sha-224':
      return DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA224;
    case 'sha-256':
      return DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA256;
    case 'sha-384':
      return DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA384;
    case 'sha-512':
      return DtlsFingerprintAlgorithm.DTLS_FINGERPRINT_ALGORITHM_SHA512;
    default:
      console.error('Invalid DTLS fingerprint algorithm string', algorithm);
      return null;
  }
}

export function protoToMediasoupDtlsFingerprint(
  fingerprint?: IDtlsFingerprint | null
): types.DtlsFingerprint | null {
  if (!fingerprint || !fingerprint.algorithm || !fingerprint.value) {
    console.error('Invalid DtlsFingerprint: missing required fields', fingerprint);
    return null;
  }

  const algorithm = protoToMediasoupFingerprintAlgorithm(fingerprint.algorithm);
  if (algorithm === null) return null;

  // Convert Uint8Array value to colon-separated hex string
  const hexValue = Array.from(new Uint8Array(fingerprint.value))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join(':')
    .toUpperCase();

  return {
    algorithm,
    value: hexValue
  };
}

export function mediasoupToProtoDtlsFingerprint(
  fingerprint?: types.DtlsFingerprint | null
): IDtlsFingerprint | null {
  if (!fingerprint || !fingerprint.algorithm || !fingerprint.value) {
    console.error('Invalid DtlsFingerprint: missing required fields', fingerprint);
    return null;
  }

  const algorithm = mediasoupToProtoFingerprintAlgorithm(fingerprint.algorithm);
  if (algorithm === null) return null;

  // Convert colon-separated hex string back to Uint8Array
  const hexPairs = fingerprint.value.split(':');
  const bytes = hexPairs.map(hex => parseInt(hex, 16));
  
  // Validate that all hex pairs were valid
  if (bytes.some(byte => isNaN(byte))) {
    console.error('Invalid DtlsFingerprint: invalid hex value', fingerprint.value);
    return null;
  }

  const value = new Uint8Array(bytes);

  return {
    algorithm,
    value
  };
}

export function protoToMediasoupDtlsParameters(
  params?: IDtlsParameters | null
): types.DtlsParameters | null {
  if (!params || !params.fingerprints || params.fingerprints.length === 0) {
    console.error('Invalid DtlsParameters: missing required fields', params);
    return null;
  }

  const role = params.role != null
    ? protoToMediasoupDtlsRole(params.role)
    : undefined;
  if (role === null) return null;

  const fingerprints: types.DtlsFingerprint[] = [];
  for (const fingerprint of params.fingerprints) {
    const convertedFingerprint = protoToMediasoupDtlsFingerprint(fingerprint);
    if (!convertedFingerprint) {
      console.error('Invalid DtlsParameters: invalid fingerprint', fingerprint);
      return null;
    }
    fingerprints.push(convertedFingerprint);
  }

  return {
    ...(role && { role }),
    fingerprints
  };
}

export function mediasoupToProtoDtlsParameters(
  params?: types.DtlsParameters | null
): IDtlsParameters | null {
  if (!params || !params.fingerprints || params.fingerprints.length === 0) {
    console.error('Invalid DtlsParameters: missing required fields', params);
    return null;
  }

  let role: number | undefined = undefined;
  if (params.role != null) {
    const convertedRole = mediasoupToProtoDtlsRole(params.role);
    if (convertedRole === null) return null;
    role = convertedRole;
  }

  const fingerprints: IDtlsFingerprint[] = [];
  for (const fingerprint of params.fingerprints) {
    const convertedFingerprint = mediasoupToProtoDtlsFingerprint(fingerprint);
    if (!convertedFingerprint) {
      console.error('Invalid DtlsParameters: invalid fingerprint', fingerprint);
      return null;
    }
    fingerprints.push(convertedFingerprint);
  }

  return {
    ...(role != null && { role }),
    fingerprints
  };
}

export function protoToMediasoupTransportOptions(
  response?: ICreateTransportResponse | null
): types.TransportOptions | null {
  if (!response || !response.transportId?.id) {
    console.error('Invalid CreateTransportResponse: missing required fields', response);
    return null;
  }

  const iceParameters = protoToMediasoupIceParameters(response.iceParameters);
  if (!iceParameters) {
    console.error('Invalid CreateTransportResponse: failed to convert ICE parameters');
    return null;
  }

  const dtlsParameters = protoToMediasoupDtlsParameters(response.dtlsParameters);
  if (!dtlsParameters) {
    console.error('Invalid CreateTransportResponse: failed to convert DTLS parameters');
    return null;
  }

  const iceCandidates: types.IceCandidate[] = [];
  if (response.iceCandidates && response.iceCandidates.length > 0) {
    for (const candidate of response.iceCandidates) {
      const convertedCandidate = protoToMediasoupIceCandidate(candidate);
      if (!convertedCandidate) {
        console.error('Invalid CreateTransportResponse: failed to convert ICE candidate', candidate);
        return null;
      }
      iceCandidates.push(convertedCandidate);
    }
  }

  return {
    id: response.transportId.id,
    iceParameters,
    dtlsParameters,
    ...(iceCandidates && { iceCandidates })
  };
}
