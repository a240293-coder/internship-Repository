import Link from 'next/link';
import QRCode from 'qrcode';

export default function SampleCertificate() {
  // ---- Dynamic data (later can come from API)
  const studentName = 'Student Name';
  const courseName = 'Web Development Internship';
  const issuedDate = 'Dec 29, 2025';

  // ---- Unique hash-based certificate ID
  const rawString = `${studentName}-${courseName}-${issuedDate}`;
  const certificateId = `LB-${btoa(rawString).slice(0, 10).toUpperCase()}`;

  const verificationUrl = `${typeof window !== 'undefined' ? window.location.origin : ''
    }/certificate/verify?id=${certificateId}`;

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF('landscape', 'pt', 'a4');

    const qrDataUrl = await QRCode.toDataURL(verificationUrl);

    // Border
    pdf.setDrawColor(225, 6, 0);
    pdf.setLineWidth(6);
    pdf.rect(20, 20, 802, 555);

    // Branding
    pdf.setFontSize(28);
    pdf.text('LearnBetter', 60, 70);
    pdf.setDrawColor(225, 6, 0);
    pdf.line(60, 76, 180, 76);

    pdf.setFontSize(12);
    pdf.text('Professional Certificate', 60, 94);

    // Title
    pdf.setFontSize(32);
    pdf.text('Certificate of Completion', 60, 160);

    pdf.setFontSize(14);
    pdf.text('This certifies that', 60, 200);

    pdf.setFontSize(26);
    pdf.text(studentName, 60, 240);

    pdf.setFontSize(14);
    pdf.text('has successfully completed the program', 60, 270);

    pdf.setFontSize(18);
    pdf.text(courseName, 60, 305);

    // Metadata
    pdf.setFontSize(12);
    pdf.text(`Issued on: ${issuedDate}`, 60, 360);
    pdf.text(`Credential ID: ${certificateId}`, 60, 385);
    pdf.text('Verified by: LearnBetter', 60, 410);

    // QR Code
    pdf.addImage(qrDataUrl, 'PNG', 640, 340, 120, 120);
    pdf.setFontSize(10);
    pdf.text('Scan to verify certificate', 640, 475);

    // Signatures
    pdf.line(60, 480, 300, 480);
    pdf.text('Mentor Signature', 60, 500);

    pdf.line(360, 480, 600, 480);
    pdf.text('Program Director', 360, 500);

    pdf.save(`${certificateId}.pdf`);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f4f5f7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
      }}
    >
      <div
        style={{
          width: 760,
          background: '#fff',
          borderRadius: 16,
          border: '6px solid #e10600',
          padding: 40,
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          textAlign: 'center',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <h1 style={{ fontSize: 30, marginBottom: 16 }}>
          Certificate of Completion
        </h1>

        <p>This certifies that</p>
        <h2 style={{ fontSize: 26 }}>{studentName}</h2>

        <p>has successfully completed</p>
        <h3 style={{ fontSize: 18 }}>{courseName}</h3>

        <div style={{ marginTop: 32, fontSize: 14 }}>
          <p>Issued on: <strong>{issuedDate}</strong></p>
          <p>Credential ID: <strong>{certificateId}</strong></p>
          <p>Verified by: <strong>LearnBetter</strong></p>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <button
          onClick={handleDownloadPDF}
          style={{
            background: '#e10600',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Download Certificate (PDF)
        </button>

        <Link
          href={`/certificate/verify?id=${certificateId}`}
          style={{
            padding: '12px 20px',
            borderRadius: 8,
            border: '1px solid #e10600',
            color: '#e10600',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Verify Certificate
        </Link>
      </div>
    </main>
  );
}
