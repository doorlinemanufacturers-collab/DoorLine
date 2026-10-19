import Image from 'next/image';

export default function ProductImage({ src, alt, priority = false, sizes = '(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw' }) {
  return (
    <div className="imgwrap">
      {src ? <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="pimg" /> : null}
    </div>
  );
}
