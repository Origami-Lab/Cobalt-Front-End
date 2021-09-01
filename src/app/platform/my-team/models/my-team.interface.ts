export interface MyTeam {
  id?: string;
  name: string;
  deletableXp: boolean;
  linkName: string;
  linkHref: string;
  datetime: string;
  stamplogin: string;
  stamppass: string;
  stampprovider: string;
  stampcert: string;
  stamphash: string;
  orgid: string;
  publicDb: boolean;
  forceCanread: string;
  forceCanwrite: string;
  doForceCanread: boolean;
  doForceCanwrite: boolean;
  visible: boolean;
}
