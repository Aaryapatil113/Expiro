const BASE_URL = '/api/waste-reports';

export const getWasteReports = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch waste reports');
  return res.json();
};

export const getWasteReportById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch waste report');
  return res.json();
};

export const getWasteReportsByProduct = async (productId) => {
  const res = await fetch(`${BASE_URL}/product/${productId}`);
  if (!res.ok) throw new Error('Failed to fetch waste reports by product');
  return res.json();
};

export const createWasteReport = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create waste report');
  return res.json();
};

export const updateWasteReport = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update waste report');
  return res.json();
};

export const deleteWasteReport = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete waste report');
  return res.json();
};
