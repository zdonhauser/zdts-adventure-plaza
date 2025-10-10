import { FeaturedRide, Ride } from "./types";

export const featuredRide: FeaturedRide = {
  name: "Switchback",
  image: "/images/rides/switchback.jpg",
  description: "Ranked #33 among the top wooden roller coasters in the world! World's first modern wooden shuttle coaster featuring a 104-degree overbanked turn and 87-degree near-vertical angle. Goes both backwards and forwards for an unforgettable ride experience.",
  badge: "For Sale"
};

export const soldRides: Ride[] = [
  { name: "Rock Wall", image: "/images/rides/rock-wall.jpg", status: "Now part of Jungle Jam Xtreme", website: "https://junglejamxtreme.com" },
  { name: "Jungle Playland", image: "/images/rides/jungle-playland.jpg", status: "Now part of Jungle Jam Xtreme", website: "https://junglejamxtreme.com" },
  { name: "Parachute Drop", image: "/images/rides/parachute.jpg", status: "Relocation details coming soon" },
  { name: "Dizzy Toucan", image: "/images/rides/dizzy-toucan.jpg", status: "Relocation details coming soon" },
  { name: "Go-Karts", image: "/images/rides/go-karts.jpg", status: "Relocation details coming soon" },
  { name: "Viper", image: "/images/rides/viper.jpg", status: "Relocation details coming soon" },
  { name: "Viper's Tail", image: "/images/rides/vipers-tail.jpg", status: "Relocation details coming soon" },
  { name: "Mad Raft Water Coaster", image: "/images/rides/mad-raft.jpg", status: "Relocation details coming soon" },

];
