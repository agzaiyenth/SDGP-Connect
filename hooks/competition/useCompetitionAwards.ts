import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useCompetitionAwards(competitionId: string | undefined) {
  const shouldFetch = Boolean(competitionId)
  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/api/award/competition/${competitionId}` : null,
    fetcher
  )
  return {
    awards: data,
    isLoading,
    isError: error
  }
}
