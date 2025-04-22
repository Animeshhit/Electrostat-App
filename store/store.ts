import { create } from "zustand";
import { Status } from "@/types/type";

interface storeState {
  status: Status;
  powerStatus: Status;
  setStatus: (value: Status) => void;
  togglePower: (value: Status) => void;
  //faults
  earthFault: Status;
  overCurrent: Status;
  underVoltage: Status;
  surge: Status;
  //fault Switches
  setEarthFault: (value: Status) => void;
  setOverCurrent: (value: Status) => void;
  setUnderVoltage: (value: Status) => void;
  setSurge: (value: Status) => void;
}

const useStore = create<storeState>((set) => ({
  status: 0,
  powerStatus: 0,
  earthFault: 0,
  overCurrent: 0,
  underVoltage: 0,
  surge: 0,
  setStatus: (newstatus) => set({ status: newstatus }),
  togglePower: (newPowerStatus) => set({ powerStatus: newPowerStatus }),
  setEarthFault: (value) => set({ earthFault: value }),
  setOverCurrent: (value) => set({ overCurrent: value }),
  setUnderVoltage: (value: Status) => set({ underVoltage: value }),
  setSurge: (value) => set({ surge: value }),
}));

export default useStore;
