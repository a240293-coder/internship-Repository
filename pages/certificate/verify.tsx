import { useRouter } from 'next/router';

export default function VerifyCertificate() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f5f7',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 40,
          borderRadius: 12,
          boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: 480,
        }}
      >
        <h1>Certificate Verification</h1>

        {id ? (
          <>
            <p>Certificate ID:</p>
            <strong style={{ fontSize: 18 }}>{id}</strong>

            <p style={{ marginTop: 16, color: '#2e7d32' }}>
              ✅ This certificate is valid and issued by LearnBetter.
            </p>
          </>
        ) : (
          <p style={{ color: '#c62828' }}>
            ❌ Invalid or missing certificate ID
          </p>
        )}
      </div>
    </main>
  );
}
