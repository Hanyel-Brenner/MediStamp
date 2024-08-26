function generatePDF(id, patientName, period, doctorObservations, doctorName, doctorUF, doctorCRM, doctorEspecialidade, hospitalAddress) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const titleColor = [0, 0, 0]; // Preto
    const borderColor = [0, 0, 0]; // Preto
    const textColor = [0, 0, 0]; // Preto
    const grayColor = [128, 128, 128]; 

    doc.setDrawColor(...borderColor);
    doc.setLineWidth(1);
    doc.rect(5, 5, 200, 287);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...titleColor);
    doc.text("Certificado Médico", 105, 20, { align: "center" });

    doc.setDrawColor(...titleColor);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(...textColor);
    doc.text(`Atesto que o Sr(a). ${patientName} encontra-se sob meus cuidados profissionais necessitando de afastamento de suas atividades pelo período de ${period}.`, 20, 40, { maxWidth: 170 });

    doc.setFont("helvetica", "bold");
    doc.text("Observações do médico:", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80); // Cor cinza escuro
    doc.text(doctorObservations, 20, 70, { maxWidth: 170 });

    doc.setFontSize(12);
    doc.setTextColor(...textColor);
    doc.text(`Médico: ${doctorName}`, 20, 100);
    doc.text(`UF: ${doctorUF}`, 20, 110);
    doc.text(`CRM: ${doctorCRM}`, 20, 120);
    doc.text(`Especialidade: ${doctorEspecialidade}`, 20, 130);
    doc.text(`Hospital: ${hospitalAddress}`, 20, 140);

    doc.setDrawColor(...borderColor); // Preto
    doc.setLineWidth(0.5);
    doc.rect(20, 160, 70, 30);
    doc.text("Assinatura do médico", 55, 180, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(...grayColor);
    doc.text("Certificado emitido por Medistamp - ID: " + id, 105, 280, { align: "center" });

    doc.save(`certificado_${id}.pdf`);
}