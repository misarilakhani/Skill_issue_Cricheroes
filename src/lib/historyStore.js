// src/lib/historyStore.js
export const getHistory = () => {
    try {
        const data = localStorage.getItem('impact_history');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};

export const addHistoryEntry = (entry) => {
    try {
        const history = getHistory();
        history.unshift(entry);
        if (history.length > 50) history.pop(); // Keep last 50 entries
        localStorage.setItem('impact_history', JSON.stringify(history));
    } catch (e) {
        console.error("Failed to save history", e);
    }
};
