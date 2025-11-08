import Banner from "@/components/Banner";
import BuildingDetails from "@/components/BuildingDetails";
import HomeOverview from "@/components/HomeOverview";
import NearbyPlaces from "@/components/NearbyPlaces";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#103c3b]">
      <div className="py-[120px] w-[1177px] mx-auto">
        <Banner />
      </div>
      <HomeOverview />
      <BuildingDetails />
      <NearbyPlaces />
      <VideoSection />
    </div>
  );
}
