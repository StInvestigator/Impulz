// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TypographyVariants, TypographyVariantsOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        mainSbL: React.CSSProperties;
        mainRL: React.CSSProperties;
        mainSbM: React.CSSProperties;
        mainRM: React.CSSProperties;
        mainSbS: React.CSSProperties;
        mainRS: React.CSSProperties;
        mainRXS: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        mainSbL?: React.CSSProperties;
        mainRL?: React.CSSProperties;
        mainSbM?: React.CSSProperties;
        mainRM?: React.CSSProperties;
        mainSbS?: React.CSSProperties;
        mainRS?: React.CSSProperties;
        mainRXS?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        mainSbL: true;
        mainRL: true;
        mainSbM: true;
        mainRM: true;
        mainSbS: true;
        mainRS: true;
        mainRXS: true;
    }
}
