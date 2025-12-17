import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateUsersPDF = async ({
  displayedUsers,
  users,
  searchTerm,
  onProgress,
}) => {
  try {
    if (!displayedUsers || displayedUsers.length === 0) {
      throw new Error("Aucune donnée à exporter");
    }

    onProgress?.(10);

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // En-tête
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Rapport des Utilisateurs", pageWidth / 2, 20, {
      align: "center",
    });

    onProgress?.(30);

    // Sous-titre
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    const dateStr = new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    doc.text(`Généré le ${dateStr}`, pageWidth / 2, 28, { align: "center" });

    // Statistiques
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const activeCount = users?.filter((u) => u.actif)?.length || 0;
    doc.text(
      `Total: ${
        users?.length || 0
      } utilisateurs | Actifs: ${activeCount} | Filtre: ${
        searchTerm || "Aucun"
      }`,
      14,
      38
    );

    onProgress?.(50);

    // Préparer les données du tableau
    const formatDateForPDF = (date) => {
      if (!date) return "Non spécifiée";
      try {
        return new Date(date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        return "Date invalide";
      }
    };

    const formatRoleName = (roleName) => {
      if (!roleName) return "INCONNU";
      const cleanName = roleName.replace("ROLE_", "");
      return (
        cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase()
      );
    };

    const tableData = displayedUsers.map((user) => [
      `${user.firstname || ""} ${user.lastname || ""}`,
      user.email || "",
      user.phone || "Non spécifié",
      user.gender
        ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
        : "Non spécifié",
      formatDateForPDF(user.dateOfBirth),
      formatDateForPDF(user.createdAt),
      formatRoleName(user.roleDto?.name),
      user.actif ? "Actif" : "Inactif",
    ]);

    onProgress?.(70);

    // Générer le tableau
    doc.autoTable({
      head: [
        [
          "Nom Complet",
          "Email",
          "Téléphone",
          "Genre",
          "Date de naissance",
          "Date d'inscription",
          "Rôle",
          "Statut",
        ],
      ],
      body: tableData,
      startY: 45,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [102, 126, 234],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 40 },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { cellWidth: 25 },
        7: { cellWidth: 20 },
      },
      margin: { top: 45 },
    });

    onProgress?.(90);

    // Pied de page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} / ${pageCount}`,
        pageWidth - 20,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    onProgress?.(100);

    // Retourner les résultats
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    return {
      pdfBlob,
      pdfUrl,
      doc,
    };
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error);
    throw error;
  }
};
