export const searchSkills = async (search: string) => {
    const params = new URLSearchParams({ q: search });

    const response = await fetch(`https://saga-search-backend.onrender.com/api/search?${params}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}