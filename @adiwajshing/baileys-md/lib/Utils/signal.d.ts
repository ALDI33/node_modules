/// <reference types="node" />
import { SignalIdentity, SignalKeyStore, SignedKeyPair, KeyPair, SignalAuthState, AuthenticationCreds } from "../Types/Auth";
import { BinaryNode, JidWithDevice } from "../WABinary";
import { proto } from "../../WAProto";
export declare const generateSignalPubKey: (pubKey: Uint8Array | Buffer) => Buffer;
export declare const jidToSignalProtocolAddress: (jid: string) => any;
export declare const jidToSignalSenderKeyName: (group: string, user: string) => string;
export declare const createSignalIdentity: (wid: string, accountSignatureKey: Uint8Array) => SignalIdentity;
export declare const getPreKeys: ({ getPreKey }: SignalKeyStore, min: number, limit: number) => Promise<{
    [id: number]: KeyPair;
}>;
export declare const generateOrGetPreKeys: (creds: AuthenticationCreds, range: number) => {
    newPreKeys: {
        [id: number]: KeyPair;
    };
    lastPreKeyId: number;
    preKeysRange: readonly [number, number];
};
export declare const xmppSignedPreKey: (key: SignedKeyPair) => BinaryNode;
export declare const xmppPreKey: (pair: KeyPair, id: number) => BinaryNode;
export declare const signalStorage: ({ creds, keys }: SignalAuthState) => {
    loadSession: (id: any) => Promise<any>;
    storeSession: (id: any, session: any) => Promise<void>;
    isTrustedIdentity: () => boolean;
    loadPreKey: (id: number) => Promise<{
        privKey: Buffer;
        pubKey: Buffer;
    }>;
    removePreKey: (id: number) => void | Promise<void>;
    loadSignedPreKey: (keyId: number) => {
        privKey: Buffer;
        pubKey: Buffer;
    };
    loadSenderKey: (keyId: any) => Promise<any>;
    storeSenderKey: (keyId: any, key: any) => Promise<void>;
    getOurRegistrationId: () => number;
    getOurIdentity: () => {
        privKey: Buffer;
        pubKey: Buffer;
    };
};
export declare const decryptGroupSignalProto: (group: string, user: string, msg: Buffer | Uint8Array, auth: SignalAuthState) => any;
export declare const processSenderKeyMessage: (authorJid: string, item: proto.ISenderKeyDistributionMessage, auth: SignalAuthState) => Promise<void>;
export declare const decryptSignalProto: (user: string, type: 'pkmsg' | 'msg', msg: Buffer | Uint8Array, auth: SignalAuthState) => Promise<Buffer>;
export declare const encryptSignalProto: (user: string, buffer: Buffer, auth: SignalAuthState) => Promise<{
    type: string;
    ciphertext: Buffer;
}>;
export declare const encryptSenderKeyMsgSignalProto: (group: string, data: Uint8Array | Buffer, meId: string, auth: SignalAuthState) => Promise<{
    ciphertext: Uint8Array;
    senderKeyDistributionMessageKey: Buffer;
}>;
export declare const parseAndInjectE2ESession: (node: BinaryNode, auth: SignalAuthState) => Promise<void>;
export declare const extractDeviceJids: (result: BinaryNode, myDeviceId: number, excludeZeroDevices: boolean) => JidWithDevice[];
