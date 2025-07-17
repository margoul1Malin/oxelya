import ClientLayoutWrapper from './ClientLayoutWrapper';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
} 