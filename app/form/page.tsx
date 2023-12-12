"use client";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { editPdf } from "../../utils/editPdf";
import { validateAge, dateConvertUK } from "@/utils/formValidations";

type Inputs = {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  nationalInsuranceNumber: string;
  // b1
  holdUkPassport: boolean;
  // c
  previousLoanSLC: boolean;
  behindWithRepayments: boolean;
  // d1
  armedForcesMember: boolean;
  // d2
  familyMemberArmedForces: boolean;
  // e
  address: string;
  postcode: string;
  telephoneNumber: string;
  emailAddress: string;
  //f What is your current relationship status? Single, Living with a partner, Married/civil partnership, Separated, Divorced, Widowed
  relationshipStatus: string;
  // if married provide date of marriage/civil partnership
  marriageDate: string;
  // a2
  ukNational: boolean;
  // a3
  irishCitizen: boolean;
  // a4
  familyMemberUkLiving3years: boolean;
  // a5
  residencyStatus: string;
};

export default function form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const watchedDateOfBirth = watch("dateOfBirth");
  const wantedRelationshipStatus = watch("relationshipStatus");
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Convert dateOfBirth to UK format before submitting
    if (data.dateOfBirth) {
      data.dateOfBirth = dateConvertUK(data.dateOfBirth);
    }

    editPdf(data);
  };

  // previousLoanSLC coordinates
  const no_previousLoanSLC = "332,722";
  const yes_previousLoanSLC = "286,722";
  // Relationship Status coordinates
  const marriageCivilPartnership = "285,143";

  // watch previousLoanSLC input
  const previousLoanSLC = watch("previousLoanSLC");
  const onError = (errors: FieldErrors<Inputs>) => console.error(errors);

  return (
    <>
      {/* Form to collect personal information */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Online Student Finance Formz
        </h1>
        <p className="mb-6">Fill out this form</p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>
          {/* title select Mr, Mrs, Miss, Ms, Mx*/}
          <div className="flex flex-col">
            <label className="mb-1">Title</label>
            <select {...register("title")} className="p-2 border rounded">
              <option value={"300,735"}>Mr</option>
              <option value={"336,735"}>Mrs</option>
              <option value={"379,735"}>Miss</option>
              <option value={"429,735"}>Ms</option>
              <option value={"466,735"}>Mx</option>
            </select>
          </div>

          {/* first name */}
          <div className="flex flex-col">
            <p>{errors.firstName?.message}</p>
            <label className="mb-1">First Name</label>
            <input
              {...register("firstName")}
              type="text"
              className="p-2 border rounded"
            />
          </div>

          {/* last name */}
          <div className="flex flex-col">
            <p>{errors.lastName?.message}</p>
            <label className="mb-1">Last Name</label>
            <input
              {...register("lastName")}
              type="text"
              className="p-2 border rounded"
            />
          </div>

          {/*gender*/}
          <div className="flex flex-col">
            <p>{errors.gender?.message}</p>
            <label className="mb-1">Gender</label>
            <select {...register("gender")} className="p-2 border rounded">
              <option value={"300,627"}>Male</option>
              <option value={"350,627"}>Female</option>
            </select>
          </div>
          {/* Date of birth  */}
          <div className="flex flex-col">
            <p>{errors.dateOfBirth?.message}</p>
            <label className="mb-1">Date of Birth</label>
            <input
              {...register(
                "dateOfBirth"
                //     {
                //   validate: {
                //     ageRequirement: (value) =>
                //       validateAge(value) || "You must be aged between 18 and 70",
                //   },
                // }
              )}
              type="date"
              className="p-2 border rounded"
            />
          </div>
          {/* place of birth */}
          <div className="flex flex-col">
            <p>{errors.placeOfBirth?.message}</p>
            <label className="mb-1">Place of Birth</label>
            <input
              {...register("placeOfBirth")}
              type="text"
              className="p-2 border rounded"
            />
          </div>

          {/* nationality */}
          <div className="flex flex-col">
            <p>{errors.nationality?.message}</p>
            <label className="mb-1">Nationality</label>
            <input
              {...register("nationality")}
              type="text"
              className="p-2 border rounded"
            />
          </div>

          {/* National Insurance Number */}
          <div className="flex flex-col">
            <p>{errors.nationalInsuranceNumber?.message}</p>
            <label className="mb-1">National Insurance Number</label>
            <input
              {...register("nationalInsuranceNumber", {
                maxLength: {
                  value: 9,
                  message: "Must be 9 characters e.g. FG123456A",
                },
              })}
              type="text"
              className="p-2 border rounded"
            />
          </div>

          {/* hold uk passport - select */}
          <div className="flex flex-col">
            <p>{errors.holdUkPassport?.message}</p>
            <label className="mb-1">Do you hold a UK passport?</label>
            <select
              {...register("holdUkPassport")}
              className="p-2 border rounded"
            >
              <option value={"342,390"}>No</option>
              <option value={"296,390"}>Yes</option>
            </select>
          </div>
          {/* previous SLC loan */}
          <div className="flex flex-col">
            <p>{errors.previousLoanSLC?.message}</p>
            <label className="mb-1">
              Have you had a previous student loan from Student Loans Company?
            </label>
            <select
              {...register("previousLoanSLC")}
              className="p-2 border rounded"
            >
              <option value={no_previousLoanSLC}>No</option>
              <option value={yes_previousLoanSLC}>Yes</option>
            </select>
          </div>
          {/* if previous SLC loan is yes, then behind with repayments? */}
          {previousLoanSLC === yes_previousLoanSLC && (
            <div className="flex flex-col">
              <p>{errors.behindWithRepayments?.message}</p>
              <label className="mb-1">
                Are you currently behind with repayments?
              </label>
              <select
                {...register("behindWithRepayments")}
                className="p-2 border rounded"
              >
                <option value={"332,682"}>No</option>
                <option value={"286,682"}>Yes</option>
              </select>
            </div>
          )}
          {/* armed forces member */}
          <div className="flex flex-col">
            <p>{errors.armedForcesMember?.message}</p>
            <label className="mb-1">
              Are you a member of the Armed Forces?
            </label>
            <select
              {...register("armedForcesMember")}
              className="p-2 border rounded"
            >
              <option value={"332,617"}>No</option>
              <option value={"286,617"}>Yes</option>
            </select>
          </div>

          {/* family member of armed forces */}
          <div className="flex flex-col">
            <p>{errors.familyMemberArmedForces?.message}</p>
            <label className="mb-1">
              Are you a family member of a member of the Armed Forces?
            </label>
            <select
              {...register("familyMemberArmedForces")}
              className="p-2 border rounded"
            >
              <option value={"332,577"}>No</option>
              <option value={"286,577"}>Yes</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <p>{errors.address?.message}</p>
            <label className="mb-1">Full address</label>
            <textarea {...register("address")} className="p-2 border rounded" />
          </div>

          {/* Postcode */}
          <div className="flex flex-col">
            <p>{errors.postcode?.message}</p>
            <label className="mb-1">Postcode</label>
            <input
              {...register("postcode")}
              type="text"
              className="p-2 border rounded"
            />
          </div>

          {/* Telephone Number */}
          <div className="flex flex-col">
            <p>{errors.telephoneNumber?.message}</p>
            <label className="mb-1">Telephone Number</label>
            <input
              {...register("telephoneNumber")}
              type="text"
              className="p-2 border rounded"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col">
            <p>{errors.emailAddress?.message}</p>
            <label className="mb-1">Email Address</label>
            <input
              {...register("emailAddress")}
              type="text"
              className="p-2 border rounded"
            />
          </div>

          {/* Relationship Status */}
          <div className="flex flex-col">
            <p>{errors.relationshipStatus?.message}</p>
            <label className="mb-1">Relationship Status</label>
            <select
              {...register("relationshipStatus")}
              className="p-2 border rounded"
            >
              <option value={"285,223"}>Single</option>
              <option value={"285,200"}>Living with a partner</option>
              <option value={marriageCivilPartnership}>
                Married/civil partnership
              </option>
              <option value={"285,84"}>Separated</option>
              <option value={"285,63"}>Divorced</option>
              <option value={"285,43"}>Widowed</option>
            </select>
          </div>

          {/* If relationship status is married/civil, marriage Date */}
          {wantedRelationshipStatus === marriageCivilPartnership && (
            <div className="flex flex-col">
              <p>{errors.marriageDate?.message}</p>
              <label className="mb-1">Marriage Date</label>
              <input
                {...register("marriageDate")}
                type="date"
                className="p-2 border rounded"
              />
            </div>
          )}

          {/* Are you a UK national? */}

          {/* Submit input with an on click and on hover animation*/}
          <input
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-700"
          />
        </form>

        {/*<a*/}
        {/*  // href={documentPath}*/}
        {/*  // download={suggestedFilename}*/}
        {/*  className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-700"*/}
        {/*>*/}
        {/*  Download Document*/}
        {/*</a>*/}
      </div>
    </>
  );
}
