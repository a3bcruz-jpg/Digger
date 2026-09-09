import type { SignalType } from '@/domain/trading';

export type AlertChannel = 'IN_APP' | 'PUSH' | 'SOUND' | 'VIBRATION';

export interface AlertPreferences {
  enabled: boolean;
  minimumSignalQuality: number;
  signalTypes: SignalType[];
  channels: AlertChannel[];
  cooldownSeconds: number;
}

export interface AlertCandidate {
  signalId: string;
  signalType: SignalType;
  signalQuality: number;
  generatedAt: string;
}

export interface AlertDecision {
  eligible: boolean;
  channels: AlertChannel[];
  reason: string;
}

export function evaluateAlert(candidate: AlertCandidate, preferences: AlertPreferences): AlertDecision {
  if (!preferences.enabled) return { eligible: false, channels: [], reason: 'Alerts are disabled by the user.' };
  if (candidate.signalType === 'WAIT') return { eligible: false, channels: [], reason: 'WAIT signals do not trigger opportunity alerts.' };
  if (!preferences.signalTypes.includes(candidate.signalType)) return { eligible: false, channels: [], reason: 'Signal type is not enabled in alert preferences.' };
  if (candidate.signalQuality < preferences.minimumSignalQuality) return { eligible: false, channels: [], reason: 'Signal quality is below the configured alert threshold.' };
  return { eligible: true, channels: preferences.channels, reason: 'Signal meets the configured alert criteria.' };
}
