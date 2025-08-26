import { useUserStore } from "@/app/components/userStore";

export default async function fetchWithAutoRefresh(){
    const { username, setUsername } = useUserStore();

    const fetchData = async () => {
      const res = await fetch("/api/currentuser");
      if (res.ok) {
        const result = await res.json();
        setUsername(result.data.username);
      }
    };
}
