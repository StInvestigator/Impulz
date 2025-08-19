import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useLayoutEffect, useRef, useState } from 'react';
import circles from '../../assets/library/circles.svg';
import { IMG_DIAMETER } from './constants';

type Align = 'left' | 'center' | 'right';

export type CirclesCardProps = {
  image: string;
  align: Align;
  borderRadius: string;
  center: { x: number; y: number } | null;
  children: React.ReactNode;
};

const CardRoot = styled(Box)<{ image: string; align: Align; br: string }>(({ theme, image, align, br }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end',
  alignItems: 'flex-start',
  padding: 0,
  boxSizing: 'border-box',
  fontSize: '24px',
  fontWeight: 700,
  cursor: 'pointer',
  placeItems: 'center',
  paddingBlock: 0,
  paddingInline: 0,
  color: 'Black',
  borderRadius: br,
  zIndex: align === "center" ? theme.zIndex.drawer + 2 : 0,
}));

const CirclesCard = ({ image, align, borderRadius, center, children }: CirclesCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<{ dx: number; dy: number }>({ dx: 0, dy: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !center) return;

    let raf = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const cardCenterX = r.left + r.width / 2;
      const cardCenterY = r.top + r.height / 2;
      setOffset({ dx: center.x - cardCenterX, dy: center.y - cardCenterY });
    };

    // defer to the next frame to avoid pre-layout values on HMR
    raf = requestAnimationFrame(measure);

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [center]);

  return (
    <CardRoot ref={ref} image={image} align={align} br={borderRadius}>
      {center && (
        <Box
          component="img"
          src={circles}
          sx={{
            position: 'absolute',
            left: `calc(50% + ${offset.dx}px - ${IMG_DIAMETER / 2}px)`,
            top: `calc(50% + ${offset.dy}px - ${IMG_DIAMETER / 2}px)`,
            width: `${IMG_DIAMETER}px`,
            height: `${IMG_DIAMETER}px`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      )}
      {children}
    </CardRoot>
  );
};

export default CirclesCard;


