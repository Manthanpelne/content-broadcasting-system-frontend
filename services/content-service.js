const MOCK_DELAY = 800;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const ContentService = {
  // Fetch all content (for Principal)
  async getAllContent() {
    await delay(MOCK_DELAY);
    const data = localStorage.getItem('broadcast_content');
    return data ? JSON.parse(data) : [];
  },

  // Fetch content for a specific teacher
  async getTeacherContent(teacherId) {
    await delay(MOCK_DELAY);
    const all = await this.getAllContent();
    return all.filter(item => item.teacherId === teacherId);
  },

  // Upload new content
  async uploadContent(payload) {
    await delay(MOCK_DELAY);
    const all = await this.getAllContent();
    const newEntry = {
      ...payload,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('broadcast_content', JSON.stringify([newEntry, ...all]));
    return newEntry;
  },

  // Principal Action: Approve/Reject
  async updateStatus(contentId, status, reason = null) {
    await delay(MOCK_DELAY);
    const all = await this.getAllContent();
    const updated = all.map(item => 
      item.id === contentId ? { ...item, status, rejectionReason: reason } : item
    );
    localStorage.setItem('broadcast_content', JSON.stringify(updated));
    return true;
  }
};