export interface TileOption {
  id: string
  title: string
  description: string
}

export interface Recommendation {
  id: string
  status: 'FOR SALE' | 'FOR RENT' | 'FOR RENT' | 'FOR SALE'
  statusColor: 'green' | 'yellow' | 'orange' | 'red'
  title: string
  subtitle: string
  price: string
  date: string
  location: string
}

export const useMockBusinessData = () => {
  const tileOptions: TileOption[] = [
    {
      id: 'lot',
      title: 'I HAVE A LOT',
      description: 'You own land and want to explore the best business opportunities for your location.'
    },
    {
      id: 'business-no-lot',
      title: 'I HAVE A BUSINESS BUT NO LOT',
      description: 'You have an idea of starting a business but need to find the ideal location to set up an area and.'
    },
    {
      id: 'space-rental',
      title: 'I NEED SPACE RENTAL OR LOT FOR SALE',
      description: 'You are looking for rental spaces or rental spaces that match your business plan premises.'
    },
    {
      id: 'supplier',
      title: 'I NEED SUPPLIER FOR MY BUSINESS',
      description: 'Connect with verified LGU verified Business partners or suppliers who can support your operations.'
    }
  ]

  const recommendations: Recommendation[] = [
    {
      id: '1',
      status: 'FOR SALE',
      statusColor: 'green',
      title: 'Lorem Ipsum',
      subtitle: 'dolor sit amet',
      price: '$XXX.XX',
      date: 'Jan 17, 2025',
      location: 'Unknown'
    },
    {
      id: '2',
      status: 'FOR RENT',
      statusColor: 'yellow',
      title: 'Lorem Ipsum',
      subtitle: 'dolor sit amet',
      price: '$XXX.XX',
      date: 'Jan 17, 2025',
      location: 'Unknown'
    },
    {
      id: '3',
      status: 'FOR RENT',
      statusColor: 'orange',
      title: 'Lorem Ipsum',
      subtitle: 'dolor sit amet',
      price: '$XXX.XX',
      date: 'Jan 17, 2025',
      location: 'Unknown'
    },
    {
      id: '4',
      status: 'FOR SALE',
      statusColor: 'red',
      title: 'Lorem Ipsum',
      subtitle: 'dolor sit amet',
      price: '$XXX.XX',
      date: 'Jan 17, 2025',
      location: 'Unknown'
    }
  ]

  return {
    tileOptions,
    recommendations
  }
}
