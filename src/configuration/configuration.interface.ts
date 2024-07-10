export interface MesConfig {
  host: string;
  appKey: string;
  appSecret: string;
}

export interface ChanJetConfig {
  host: string;
  key: string;
  secret: string;
  refreshToken: string;
}

export interface K3WiseConfig {
  host: string;
  authorityCode: string;
}

export interface K3CloudConfig {
  host: string;
  key: string;
  secret: string;
  lcid: number;
  acctid: string;
}

export interface Configuration {
  http: {
    mes: MesConfig;
    chanJet: ChanJetConfig;
    k3wise: K3WiseConfig;
    k3cloud: K3CloudConfig;
  };
}
