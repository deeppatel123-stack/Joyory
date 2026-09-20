import React, { useState, useEffect } from "react";
import { outcomeService } from "../../services/outcomeService";
import { OutcomeCard } from "../../components/customer/OutcomeCard";
import { OutcomeFeedbackModal } from "../../components/customer/OutcomeFeedbackModal";
import { Sparkles, ArrowRight, RotateCw, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { useNotification } from "../../context/NotificationContext";

export const BeautyOutcomePage = () => {
  const [outcomes, setOutcomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useNotification();

  const loadOutcomes = async () => {
    setLoading(true);
    try {
      const data = await outcomeService.getBeautyOutcomes();
      setOutcomes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOutcomes();
  }, []);

  const handleOpenFeedback = (outcome) => {
    setSelectedOutcome(outcome);
    setModalOpen(true);
  };

  const handleSubmitFeedback = async (outcomeId, feedbackData) => {
    try {
      const result = await outcomeService.updateOutcomeExperience(outcomeId, feedbackData);
      await loadOutcomes();
      addToast(
        `Learned preferences recorded: ${feedbackData.texture} texture preference strengthened`,
        "success",
        "Beauty Outcome Logged"
      );
      return result;
    } catch (err) {
      addToast("Failed to save outcome feedback", "error");
      throw err;
    }
  };

  return (
    <div className="space-y-8">
      {/* 4. HEADER */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
            Feature 01: Post-Purchase Learning Loop
          </span>
          <Badge variant="accent" size="sm">
            Continuous Outcome Loop
          </Badge>
          <span className="text-[11px] text-stone-400 italic">
            * This capability is not publicly listed/documented among Joyory's current visible product features.
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
          Your Product Outcomes
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl leading-relaxed">
          The Beauty Journey does not stop at checkout. Joyory learns from how delivered formulations actually feel on your skin, using your outcomes to continually calibrate your Beauty Memory.
        </p>
      </div>

      {/* Outcome Lifecycle Visual Guide */}
      <div className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-3">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block">
          Outcome Lifecycle Flow
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {[
            { step: "01. Purchased", status: "Order placed" },
            { step: "02. Trying", status: "Active in routine" },
            { step: "03. Used", status: "Formulation tested" },
            { step: "04. Experience Logged", status: "Sensory feedback" },
            { step: "05. Preference Updated", status: "Memory calibrated" }
          ].map((s, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">{s.step}</span>
              <span className="text-[10px] text-stone-400 block">{s.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Outcomes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Purchased Formulations in Your Routine
          </h2>
          <span className="text-xs text-stone-400">{outcomes.length} Tracked Formulations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {outcomes.map((outcome) => (
            <OutcomeCard
              key={outcome.id}
              outcome={outcome}
              onLogFeedback={handleOpenFeedback}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <OutcomeFeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        outcome={selectedOutcome}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </div>
  );
};
