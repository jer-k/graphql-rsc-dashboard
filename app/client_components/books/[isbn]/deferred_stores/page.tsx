import { ClientBookStores } from "@/components/client-book-stores";

type Props = {
  params: {
    isbn: string;
  };
};

export default function DeferredStoresPage({ params: { isbn } }: Props) {
  return <ClientBookStores isbn={isbn} />;
}
