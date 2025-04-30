import { Icon } from "@iconify/react";
import type { HeaderProps, HeaderStyles } from "../../types";
import useColors from "../../hooks/useColors";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useState, useEffect } from "react";

const Header = ({ navbarOptions }: HeaderProps) => {
    const { color } = useColors();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const styles: HeaderStyles = {
        navbar: {
            container: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                height: "65px",
                backgroundColor: color.primary,
                position: "relative",
            },
            title: {
                container: {
                    display: "flex",
                    alignItems: "center",
                },
                text: {
                    fontSize: "var(--font-size-nav-title)",
                    color: color.primary_content,
                    fontWeight: 500,
                    marginLeft: "10px",
                },
                link: {
                    textDecoration: "none",
                    color: color.primary_content,
                    fontSize: "var(--font-size-nav-title)",
                    display: "flex",
                    alignItems: "center",
                }
            },
            links: {
                list: {
                    display: "flex",
                    listStyleType: "none",
                    gap: "8px",
                    alignItems: "center",
                    ...(isMobile && {
                        display: isMobileMenuOpen ? "flex" : "none",
                        flexDirection: "column",
                        position: "absolute",
                        top: "65px",
                        left: 0,
                        right: 0,
                        backgroundColor: color.primary,
                        padding: "20px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        zIndex: 1000,
                    }),
                },
                item: {
                    marginLeft: "20px",
                    color: color.primary_content,
                    textDecoration: "none",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    ...(isMobile && {
                        marginLeft: 0,
                        width: "100%",
                    }),
                },
                urlElement: {
                    textDecoration: "none",
                    color: color.primary_content,
                    fontSize: "var(--font-size-nav-link)",
                    display: "flex",
                    padding: "12px",
                    gap: "10px",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                    ...(isMobile && {
                        width: "100%",
                    }),
                },
                dropdown: {
                    container: {
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        backgroundColor: color.primary,
                        minWidth: "200px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        opacity: isDropdownVisible ? "1" : "0",
                        visibility: isDropdownVisible ? "visible" : "hidden",
                        transition: "all 0.2s ease",
                        zIndex: "1000",
                        ...(isMobile && {
                            position: "static",
                            boxShadow: "none",
                            opacity: "1",
                            visibility: "visible",
                            display: isDropdownVisible ? "block" : "none",
                        }),
                    },
                    item: {
                        padding: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: color.primary_content,
                        textDecoration: "none",
                        fontSize: "var(--font-size-nav-link)",
                        borderBottom: `1px solid ${color.primary_light}`,
                    },
                    itemHover: {
                        backgroundColor: color.primary_light,
                    },
                    indicator: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px",
                        color: color.primary_content,
                        fontSize: "var(--font-size-nav-link)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        backgroundColor: isDropdownVisible ? color.primary_light : "transparent",
                        borderRadius: "4px",
                        ...(isMobile && {
                            width: "100%",
                        }),
                    }
                },
                mobileMenuButton: {
                    display: "none",
                    ...(isMobile && {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px",
                        cursor: "pointer",
                        color: color.primary_content,
                    }),
                },
            }
        }
    }

    return (
        <header>
            <nav style={styles.navbar.container}>
                <div style={styles.navbar.title.container}>
                    <Icon icon="fluent:box-24-filled" width="32" height="32" color={color.primary_content} />
                    <h1 style={styles.navbar.title.text}><a style={styles.navbar.title.link} href="/">{navbarOptions.title}</a></h1>
                </div>
                {isMobile && (
                    <div 
                        style={styles.navbar.links.mobileMenuButton}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Icon 
                            icon={isMobileMenuOpen ? "mdi:close" : "mdi:dots-vertical"} 
                            width="24" 
                            height="24" 
                        />
                    </div>
                )}
                <ul style={styles.navbar.links.list}>
                    {navbarOptions.links.map((link, index) => (
                        <li 
                            key={index} 
                            style={styles.navbar.links.item}
                            onMouseEnter={() => !isMobile && link.dropdown && setIsDropdownVisible(true)}
                            onMouseLeave={() => !isMobile && link.dropdown && setIsDropdownVisible(false)}
                        >
                            {link.dropdown ? (
                                <div>
                                    <div 
                                        style={styles.navbar.links.dropdown.indicator}
                                        onClick={() => isMobile && setIsDropdownVisible(!isDropdownVisible)}
                                    >
                                        <Icon icon={link.icon} width="20" height="20" />
                                        {link.name}
                                        <Icon 
                                            icon="mdi:chevron-down" 
                                            width="16" 
                                            height="16"
                                            style={{
                                                transition: "transform 0.2s ease",
                                                transform: isDropdownVisible ? "rotate(180deg)" : "rotate(0deg)"
                                            }}
                                        />
                                    </div>
                                    <div style={styles.navbar.links.dropdown.container}>
                                        {link.dropdown.map((dropdownItem, dropdownIndex) => (
                                            <a 
                                                key={dropdownIndex} 
                                                href={dropdownItem.url}
                                                style={styles.navbar.links.dropdown.item}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = color.primary_light;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "transparent";
                                                }}
                                                onClick={() => isMobile && setIsMobileMenuOpen(false)}
                                            >
                                                <Icon icon={dropdownItem.icon} width="20" height="20" />
                                                {dropdownItem.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <a 
                                    href={link.url} 
                                    style={styles.navbar.links.urlElement}
                                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                                >
                                    <Icon icon={link.icon} width="20" height="20" />
                                    {link.name}
                                </a>
                            )}
                        </li>
                    ))}
                    <li>
                        <ThemeSwitcher />
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;