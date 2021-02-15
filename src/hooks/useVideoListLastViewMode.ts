export const useLastViewMode = () => {
  const lastViewMode = localStorage.getItem('viewMode')
  if (!lastViewMode || (lastViewMode !== 'list' && lastViewMode !== 'card')) return false
  return lastViewMode
}