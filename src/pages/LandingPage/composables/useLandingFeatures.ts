export interface LandingFeature {
  title: string
  description: string
  icon: string
}

export function useLandingFeatures() {
  const features: LandingFeature[] = [
    {
      title: "Unlimited Design Inspirations",
      description: "Get unlimited design inspirations. Level up your design.",
      icon: "📈"
    },
    {
      title: "14+ Premium UI Kits",
      description: "14+ Premium tailwind UI kits. Start with unlimited product downloads.",
      icon: "✨"
    },
    {
      title: "Unlimited Design Inspirations",
      description: "Get unlimited design inspirations. Level up your design.",
      icon: "🎨"
    },
    {
      title: "14+ Premium UI Kits",
      description: "14+ Premium tailwind UI kits. Start with unlimited product downloads.",
      icon: "🔐"
    },
    {
      title: "Unlimited Design Inspirations",
      description: "Get unlimited design inspirations. Level up your design.",
      icon: "⚡"
    },
    {
      title: "14+ Premium UI Kits",
      description: "14+ Premium tailwind UI kits. Start with unlimited product downloads.",
      icon: "🔗"
    }
  ]

  return {
    features
  }
}
