'use client';

import {useState, useEffect, useCallback} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {ChatInterface} from './ChatInterface';

const MOBILE_BREAKPOINT = 768;

/**
 * Chat bubble component that opens a popover chat interface when clicked
 * Positioned fixed at bottom-right corner with smooth animations
 * Includes mobile-specific features: close button and scroll-triggered hiding
 */
export function ChatBubble() {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isContactVisible, setIsContactVisible] = useState(false);

    /**
     * Mobile detection with debounced resize handling
     */
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        checkMobile();

        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkMobile, 150);
        };

        window.addEventListener('resize', handleResize, {passive: true});
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    /**
     * Prevent scrolling when popover is open on mobile using CSS class
     */
    useEffect(() => {
        if (!isMobile) return;
        const classList = document.body.classList;

        if (open) {
            classList.add('chat-popover-open');
        } else {
            classList.remove('chat-popover-open');
        }

        return () => {
            classList.remove('chat-popover-open');
        };
    }, [open, isMobile]);

    /**
     * Scroll detection for contact section (mobile only)
     */
    useEffect(() => {
        if (!isMobile) return;

        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        const observer = new IntersectionObserver(
            (entries) => {
                requestAnimationFrame(() => {
                    entries.forEach((entry) => {
                        setIsContactVisible(entry.isIntersecting);
                    });
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px',
            }
        );

        observer.observe(contactSection);
        return () => observer.disconnect();
    }, [isMobile]);

    /**
     * Close button handler
     */
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    /**
     * Bubble animation variants
     */
    const bubbleVariants = {
        visible: {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
        },
        hidden: {
            scale: 0.8,
            opacity: 0,
            x: 0,
            y: 0,
        },
        offScreen: {
            scale: 0.8,
            opacity: 0,
            x: 200,
            y: 0,
        },
    };

    /**
     * Close button animation variants
     */
    const closeButtonVariants = {
        visible: {
            scale: 1,
            opacity: 1,
        },
        hidden: {
            scale: 0.8,
            opacity: 0,
        },
    };

    /**
     * Determine bubble animation state
     */
    const getBubbleAnimationState = () => {
        if (isMobile && isContactVisible) return 'offScreen';
        if (isMobile && open) return 'hidden';
        return 'visible';
    };

    const shouldShowBubble = !isMobile || !open;
    const shouldShowCloseButton = isMobile && open;

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <motion.button
                        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
                        aria-label="Open chat with Shay Azulay Agent"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        variants={bubbleVariants}
                        initial="visible"
                        animate={getBubbleAnimationState()}
                        transition={{type: 'spring', stiffness: 260, damping: 20}}
                        style={{
                            pointerEvents: shouldShowBubble ? 'auto' : 'none',
                        }}
                    >
                        <div className="relative w-10 h-10 rounded-full bg-white overflow-hidden shadow-md">
                            <Image
                                src="/shayAzulay.png"
                                alt="Shay Azulay"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <span className="text-sm font-medium text-foreground whitespace-nowrap">
              Let&apos;s talk
            </span>
                    </motion.button>
                </PopoverTrigger>
                <PopoverContent
                    side="top"
                    align="end"
                    className="w-100 h-150 p-0 bg-white shadow-lg"
                    style={{
                        boxShadow: '0 -4px 20px rgba(124, 7, 124, 0.15), 0 8px 30px rgba(124, 7, 124, 0.1)',
                    }}
                    sideOffset={16}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-hidden">
                            <ChatInterface/>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <AnimatePresence>
                {shouldShowCloseButton && (
                    <motion.button
                        onClick={handleClose}
                        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
                        aria-label="Close chat"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        variants={closeButtonVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{type: 'spring', stiffness: 260, damping: 20}}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-foreground"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}

