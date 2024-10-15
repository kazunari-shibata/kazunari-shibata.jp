import styles from '@/app/styles/home/components/Article.module.scss';
import { useTranslations } from 'next-intl';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import Link from 'next/link';

type ArticleTypes = {
    title: string;
    h2: string;
    description: string;
    url: string;
    imageSrc: string;
    imageWidth: number;
    imageHeight: number;
    imagePriority: boolean;
    copyright: string;
};

export function Article(data: ArticleTypes) {
    const t = useTranslations('Article');

    return (
        <article className={styles.container}>
            <div className={styles.image}>
                <Image
                    src={data.imageSrc}
                    alt={data.title}
                    width={data.imageWidth}
                    height={data.imageHeight}
                    priority={data.imagePriority}
                />
                <span
                    className={styles.copyright}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data.copyright),
                    }}
                />
            </div>
            <div className={styles.texts}>
                <h2
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data.h2),
                    }}
                />
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data.description),
                    }}
                />
                <div className={styles.gradation}></div>
            </div>
            <div className={styles.button}>
                <Link
                    href={data.url}
                    target="_blank"
                    aria-label={`See more about the ${data.title}`}
                >
                    <span>{t('See more')}</span>
                </Link>
                <div className={styles.gradation}></div>
            </div>
        </article>
    );
}
