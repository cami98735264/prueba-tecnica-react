/* Layout Components */
export interface HeaderProps {
    navbarOptions: {
        title: string;
        links: {
            name: string;
            icon: string;
            url?: string;
            dropdown?: {
                name: string;
                icon: string;
                url: string;
            }[];
        }[];
    }
}
export interface HeaderStyles {
    navbar: {
        container: React.CSSProperties;
        title: {
            container: React.CSSProperties;
            text: React.CSSProperties;
            link: React.CSSProperties;
        };
        links: {
            list: React.CSSProperties;
            item: React.CSSProperties;
            urlElement: React.CSSProperties;
            dropdown: {
                container: React.CSSProperties;
                item: React.CSSProperties;
                itemHover: React.CSSProperties;
                indicator: React.CSSProperties;
            };
            mobileMenuButton: React.CSSProperties;
        };
    };
}


export interface LayoutProps {
    children: React.ReactNode;
    sectionTitle: string;
    icon?: string;
}


export interface LayoutStyles {
    layout: React.CSSProperties;
    main: React.CSSProperties;
    sectionTitle: {
      text: React.CSSProperties;
      container: React.CSSProperties; // Updated to match the assigned object
    };
  }
/* UI Components */
export interface StatsCardProps {
    flexDirection?: React.CSSProperties["flexDirection"];
    iconSize?: number;
    icon: string;
    textSize?: "large" | "small";
    highlight: string;
    description: string;
    gridStyles: React.CSSProperties;
}

export interface StatsCardStyles {
    card: React.CSSProperties;
    icon: React.CSSProperties;
    highlight: React.CSSProperties;
    description: React.CSSProperties;
    content: React.CSSProperties;
}



export interface SubtitleProps {
    icon?: string;
    children: React.ReactNode;
}

export interface SubtitleStyles {
    subtitle: React.CSSProperties;
}


export interface AuditoryCardProps {
    icon: string;
    description: string;
}

export interface ProductAmountCardProps {
    amount: number;
    icon?: string;
    gridStyles?: React.CSSProperties;
    text?: string;
}

export interface ProductCardProps {
    code: string;
    name: string;
    description: string;
    date: string;
    gridStyles?: React.CSSProperties;
}