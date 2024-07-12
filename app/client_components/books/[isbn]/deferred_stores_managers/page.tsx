import { ClientBookStoresManagers } from "@/components/client-book-stores-managers";

type Props = {
  params: {
    isbn: string;
  };
};

export default function DeferredStoresManagersPage({ params: { isbn } }: Props) {
  return <ClientBookStoresManagers isbn={isbn} />;
}
