import { create } from "zustand";

// Define RoomType for individual rooms
interface RoomType {
  voltage: number;
  roomName: string;
  power: number;
  current: number;
  status: number;
}

// Define the structure of the store
interface ApModeStore {
  office: RoomType;
  kitchen: RoomType;
  living: RoomType;
  dashboard: {
    voltage: number;
    totalPowerConsumption: number;
  };

  // Actions
  setRoomData: (
    roomName: "office" | "kitchen" | "living",
    data: Partial<RoomType>
  ) => void;
  setDashboardData: (data: {
    voltage?: number;
    totalPowerConsumption?: number;
  }) => void;
}

// Define the Zustand store
const useApStore = create<ApModeStore>((set) => ({
  office: {
    voltage: 0.0,
    roomName: "office",
    power: 0.0,
    current: 0.0,
    status: 0,
  },
  kitchen: {
    voltage: 0.0,
    roomName: "kitchen",
    power: 0.0,
    current: 0.0,
    status: 0,
  },
  living: {
    voltage: 0.0,
    roomName: "living",
    power: 0.0,
    current: 0.0,
    status: 0,
  },
  dashboard: {
    voltage: 0.0,
    totalPowerConsumption: 0.0,
  },

  // Actions to update the rooms' and dashboard's states
  setRoomData: (roomName, data) =>
    set((state) => ({
      [roomName]: {
        ...state[roomName],
        ...data,
      },
    })),

  setDashboardData: (data) =>
    set((state) => ({
      dashboard: {
        ...state.dashboard,
        ...data,
      },
    })),
}));

export default useApStore;
